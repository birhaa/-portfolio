import React, { forwardRef, useMemo } from 'react'
import { OutlineEffect } from 'postprocessing'

export const CustomeOutline = forwardRef(({ granularity = 5 }, ref) => {
  const effect = useMemo(() => new OutlineEffect(granularity), [granularity])
  return <primitive ref={ref} object={effect} dispose={null} />
})