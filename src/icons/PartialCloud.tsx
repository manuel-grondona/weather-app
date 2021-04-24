import * as React from "react"

export function PartialCloud(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={48}
      viewBox="0 0 13.547 13.547"
      height={48}
      {...props}
    >
      <defs>
        <linearGradient id="prefix__a">
          <stop offset={0} stopColor="#729fcf" />
          <stop offset={1} stopColor="#729fcf" stopOpacity={0} />
        </linearGradient>
        <linearGradient id="prefix__b">
          <stop offset={0} stopColor="#5dac12" />
          <stop offset={1} stopColor="#76c925" />
        </linearGradient>
        <linearGradient id="prefix__c">
          <stop offset={0} stopColor="#a2c6ff" />
          <stop offset={1} stopColor="#9f7e42" />
        </linearGradient>
        <linearGradient id="prefix__d">
          <stop offset={0} stopColor="#8dc5ff" />
          <stop offset={1} stopColor="#f2c600" />
        </linearGradient>
        <linearGradient id="prefix__e">
          <stop offset={0} stopColor="#a2c6ff" />
          <stop offset={1} stopColor="#9f7e42" />
        </linearGradient>
      </defs>
      <g fillRule="evenodd">
        <rect
          width={12.982}
          x={0.282}
          y={0.282}
          rx={6.491}
          height={12.982}
          fill="#f9f9f9"
        />
        <rect
          width={11.853}
          x={0.847}
          y={0.847}
          rx={5.927}
          height={11.853}
          fill="#62c4ec"
        />
        <path
          d="M11.147 6.283c0 1.488-1.164 2.695-2.6 2.695-1.435 0-2.599-1.207-2.599-2.695 0-1.489 1.164-2.695 2.6-2.695 1.435 0 2.6 1.206 2.6 2.695z"
          fill="#fae75d"
        />
        <path
          d="M5.59 5.572c.723 0 1.343.41 1.673 1a1.14 1.14 0 01.682-.229c.592 0 1.071.432 1.071.964 0 .12-.022.232-.067.338.673.27 1.138.882 1.138 1.59 0 .961-.86 1.735-1.927 1.735H4.304c-1.068 0-1.928-.774-1.928-1.735 0-.761.543-1.404 1.299-1.639 0-.032-.014-.063-.014-.096 0-1.064.864-1.928 1.928-1.928z"
          fill="#fff"
        />
      </g>
    </svg>
  )
}
