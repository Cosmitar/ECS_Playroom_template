import React, { useEffect, useRef } from 'react'
import { Entity } from 'koota'
import { RenderHandler, Three } from '../../traits/renderableTraits'
import mergeRefs from '../../../utils/mergeRefs'

export default function ThreeEntity({ entity }: { entity: Entity }) {
  const ref = useRef<any>(null!)
  const node = entity.get(RenderHandler).render

  useEffect(() => {
    entity.add(Three({ ref }))

    return () => entity.remove(Three)
  }, [entity])

  return React.cloneElement(node, {
    ref: mergeRefs([(node as any).ref, ref]),
  })
}
