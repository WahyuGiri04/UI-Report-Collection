export function FooterBg(){
    return (
        <svg
            width="100%"
            height="100%"
            id="svg"
            viewBox="0 0 1440 590"
            xmlns="http://www.w3.org/2000/svg"
            className="transition duration-300 ease-in-out delay-150"
            style={{ clipPath: 'inset(0% round 15px)' }} // Menambahkan clip-path dengan sudut melengkung
        >
            <defs>
                <linearGradient id="gradient" x1="50%" y1="100%" x2="50%" y2="0%">
                    <stop offset="5%" stopColor="#fa1111" />
                    <stop offset="95%" stopColor="#2f0680" />
                </linearGradient>
            </defs>
            <path
                d="M 0,600 L 0,390 C 140.46428571428572,405.05357142857144 280.92857142857144,420.10714285714283 418,414 C 555.0714285714286,407.89285714285717 688.75,380.625 782,356 C 875.25,331.375 928.0714285714287,309.3928571428571 1031,278 C 1133.9285714285713,246.60714285714286 1286.9642857142858,205.80357142857144 1440,165 L 1440,600 L 0,600 Z"
                stroke="none"
                strokeWidth="0"
                fill="url(#gradient)"
                fillOpacity="0.265"
                className="transition-all duration-300 ease-in-out delay-150 path-0"
            />
            <path
                d="M 0,600 L 0,510 C 96.75,499.6607142857143 193.5,489.32142857142856 308,467 C 422.5,444.67857142857144 554.7499999999999,410.37500000000006 689,396 C 823.2500000000001,381.62499999999994 959.5,387.1785714285714 1085,372 C 1210.5,356.8214285714286 1325.25,320.91071428571433 1440,285 L 1440,600 L 0,600 Z"
                stroke="none"
                strokeWidth="0"
                fill="url(#gradient)"
                fillOpacity="0.4"
                className="transition-all duration-300 ease-in-out delay-150 path-1"
            />
            <path
                d="M 0,600 L 0,630 C 141.82142857142858,632.625 283.64285714285717,635.25 395,620 C 506.35714285714283,604.75 587.25,571.625 706,557 C 824.75,542.375 981.3571428571429,546.25 1110,524 C 1238.642857142857,501.74999999999994 1339.3214285714284,453.375 1440,405 L 1440,600 L 0,600 Z"
                stroke="none"
                strokeWidth="0"
                fill="url(#gradient)"
                fillOpacity="0.53"
                className="transition-all duration-300 ease-in-out delay-150 path-2"
            />
            <path
                d="M 0,600 L 0,750 C 96.92857142857142,761.2678571428571 193.85714285714283,772.5357142857143 329,761 C 464.14285714285717,749.4642857142857 637.5000000000001,715.125 769,691 C 900.4999999999999,666.875 990.1428571428571,652.9642857142857 1095,627 C 1199.857142857143,601.0357142857143 1319.9285714285716,563.0178571428571 1440,525 L 1440,600 L 0,600 Z"
                stroke="none"
                strokeWidth="0"
                fill="url(#gradient)"
                fillOpacity="1"
                className="transition-all duration-300 ease-in-out delay-150 path-3"
            />
        </svg>
    )
}