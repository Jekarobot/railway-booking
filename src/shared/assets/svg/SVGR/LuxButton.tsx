import React from 'react'

interface SvgFoodProps extends React.SVGProps<SVGSVGElement> {}

const SvgFood: React.FC<SvgFoodProps> = (props) => (
  <svg
    width="57"
    height="50"
    viewBox="0 0 57 50"
    fill="currentColor"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path d="M28.2258 0L34.8606 19.0776H56.4516L39.0213 30.9224L45.6561 50L28.2258 38.26L10.7955 50L17.4303 30.9224L0 19.0776H21.5911L28.2258 0Z" />
  </svg>
)

export default SvgFood
