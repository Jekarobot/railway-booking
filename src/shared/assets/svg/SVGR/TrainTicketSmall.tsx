import React from 'react'

interface SvgWiFiProps extends React.SVGProps<SVGSVGElement> {}
const TrainTicketSmallIcon: React.FC<SvgWiFiProps> = (props) => (
  <svg
    width="16"
    height="20"
    viewBox="0 0 16 20"
    fill="currentColor"
    xmlns="http://www.w3.org/2000/svg"
    {...props} // This allows passing additional props like className or style
  >
    <path d="M12.461 17.2222C12.7849 17.9136 13.7325 18.152 13.7685 19.0698C9.90597 19.0698 6.0914 19.0698 2.22885 19.0698C2.28883 18.1639 3.21248 17.9136 3.56035 17.2342C3.24847 17.1626 2.96058 17.115 2.68468 17.0315C1.31719 16.6143 0.345558 15.3509 0.345558 13.9086C0.321567 10.8334 0.321567 7.78197 0.333563 4.71865C0.333563 3.30023 0.993315 2.22747 2.32481 1.76261C3.40441 1.3931 4.55598 1.16663 5.69555 1.05935C7.92671 0.856722 10.1699 0.856722 12.377 1.32158C12.9408 1.44078 13.4926 1.64341 13.9964 1.89372C15.076 2.4301 15.6398 3.3479 15.6518 4.52794C15.6758 7.68662 15.6878 10.8453 15.6518 14.004C15.6398 15.4582 14.5602 16.6978 13.1447 17.0554C12.9288 17.1269 12.7009 17.1626 12.461 17.2222ZM7.01505 4.82593C5.40766 4.82593 3.83625 4.82593 2.28883 4.82593C2.28883 6.42314 2.28883 7.97268 2.28883 9.52222C3.88423 9.52222 5.43165 9.52222 7.01505 9.52222C7.01505 7.94885 7.01505 6.41122 7.01505 4.82593ZM13.7325 4.82593C12.1251 4.82593 10.5537 4.82593 9.0063 4.82593C9.0063 6.42314 9.0063 7.97268 9.0063 9.52222C10.6017 9.52222 12.1491 9.52222 13.7325 9.52222C13.7325 7.94885 13.7325 6.41122 13.7325 4.82593ZM5.11976 13.8609C5.13176 13.0742 4.47201 12.4187 3.68031 12.4187C2.91259 12.4187 2.26484 13.0385 2.24085 13.8013C2.21686 14.588 2.85262 15.2555 3.64432 15.2794C4.44802 15.2913 5.10777 14.6476 5.11976 13.8609ZM13.7565 13.8371C13.7565 13.0504 13.0848 12.4068 12.2931 12.4187C11.5254 12.4306 10.8896 13.0623 10.8776 13.8252C10.8656 14.6119 11.5134 15.2674 12.3051 15.2794C13.1088 15.2794 13.7565 14.6238 13.7565 13.8371Z" />
  </svg>
)

export default TrainTicketSmallIcon
