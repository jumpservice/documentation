import type { Heading } from 'nextra'
import type { ReactElement } from 'react'
import { useEffect, useMemo, useState } from 'react'

export type TOCProps = {
  headings: Heading[]
}

export default function TOC({ headings }: TOCProps): ReactElement | null {
  // const items = useMemo(
  //   () => headings.filter(h => h.depth !== 2),
  //   [headings]
  // )

  const items = useMemo(() => {
    // 过滤掉一级标题
    const filtered = headings.filter(h => h.depth !== 1)
    // 找到剩余标题中最小的深度
    const minDepth = Math.min(...filtered.map(h => h.depth))
    // 只保留深度等于这个最小深度的标题
    return filtered.filter(h => h.depth === minDepth)
  }, [headings])

  const [activeId, setActiveId] = useState<string | null>(null)

  // 监听 hash 变化（用户滚动或手动修改 URL 时）
  useEffect(() => {
    const updateActiveId = () => {
      setActiveId(window.location.hash.slice(1)) // 移除 # 号
    }

    updateActiveId() // 初始化
    window.addEventListener('hashchange', updateActiveId)

    return () => {
      window.removeEventListener('hashchange', updateActiveId)
    }
  }, [])

  if (items.length === 0) return null

  return (
    <div className="group sticky top-16 overflow-y-auto overflow-x-hidden max-h-[calc(100vh-(100vh/3))] my-10 mb-10 pr-4 text-sm custom-scrollbar">
      <p className="mb-4 font-semibold tracking-tight mt-8 text-sm">In this article</p>
      <ul className="space-y-2">
        {items.map(({ id, value }) => {
          const isActive = id === activeId
          return (
            <li key={id}>
              <a
                href={`#${id}`}
                className={`block hover:text-primary dark:hover:text-primary break-words whitespace-normal text-[13px] ${
                  isActive
                    ? 'text-primary-600 font-semibold text-primary'
                    : 'text-black dark:text-white'
                }`}
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