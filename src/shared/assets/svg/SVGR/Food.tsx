import React from 'react'

interface SvgFoodProps extends React.SVGProps<SVGSVGElement> {}

const SvgFood: React.FC<SvgFoodProps> = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={20} height={18} fill="currentColor" {...props}>
    <path d="M2.399.526h14.864c1.482 0 2.205.724 2.205 2.231 0 .807.012 1.626 0 2.433-.012 1.187-.794 1.97-1.968 1.982-.592.012-1.173 0-1.813 0v2.646c-.012 2.374-1.612 3.987-3.971 4-1.778 0-3.556.011-5.334 0-2.335-.013-3.96-1.615-3.96-3.94C2.388 6.78 2.4 3.706 2.4.525m13.323 1.91v2.802h1.802V2.436zM17.536 15.752v1.827H.526v-1.828z" />
  </svg>
)

export default SvgFood
