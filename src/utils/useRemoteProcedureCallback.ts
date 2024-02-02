import { RPC, RPCMode } from 'playroomkit'
import { useEffect, useRef } from 'react'

export default function useRemoteProcedureCallback(RPName: string, callback: () => void, mode: RPCMode = RPC.Mode.ALL) {
  const RPCListener = useRef<() => void>()

  useEffect(() => {
    if (!RPCListener.current) {
      try {
        RPCListener.current = RPC.register(RPName, () => {
          callback()
          return Promise.resolve(true)
        })
      } catch (e) {
        // probably trying to register a callback before insertCoin
      }
    }
  }) // no dependency

  return (payload?: any, overwrittenMode?: RPCMode) => RPC.call(RPName, payload, overwrittenMode ?? mode)
}
