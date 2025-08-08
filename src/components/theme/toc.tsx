import type { Heading } from 'nextra'
import type { ReactElement } from 'react'
import { useEffect, useMemo, useState } from 'react'

export type TOCProps = {
  headings: Heading[]
}

export default function TOC({ headings }: TOCProps): ReactElement | null {
  const items = useMemo(() => {
    // 过滤掉 depth 为 1 的标题（通常是页面主标题）
    return headings.filter(h => h.depth > 1)
  }, [headings])

  const [activeId, setActiveId] = useState<string | null>(null)

  useEffect(() => {
    const updateActiveId = () => {
      setActiveId(window.location.hash.slice(1))
    }

    updateActiveId()
    window.addEventListener('hashchange', updateActiveId)

    return () => {
      window.removeEventListener('hashchange', updateActiveId)
    }
  }, [])

  if (items.length === 0) return null

  const minDepth = Math.min(...items.map(h => h.depth))

  return (
    <div className="group sticky top-16 overflow-y-auto overflow-x-hidden max-h-[calc(100vh-(100vh/3))] my-10 mb-10 pr-4 text-sm custom-scrollbar">
      <p className="mb-6 font-semibold tracking-tight mt-8 text-sm">In this article</p>
      <ul className="space-y-2 mt-3">
        {items.map(({ id, value, depth }) => {
          const isActive = id === activeId
          let indent = (depth - minDepth) * 10 // 每层 10px 缩进（可调大）
          return (
            <li key={id}>
              <a
                href={`#${id}`}
                className={`block hover:text-primary dark:hover:text-primary break-words whitespace-normal text-[13px] ${
                  isActive
                    ? 'text-primary-600 font-semibold text-primary'
                    : 'text-black dark:text-white'
                }`}
                style={{ paddingLeft: `${indent}px` }}
              >
                {value}
              </a>
            </li>
          )
        })}
      </ul>
    </div>
  )
}