export default function RightArrowIcon({ size, color }: { size: number; color: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <path
        d="M19.1218 18.394L23.0408 14.475C23.6772 13.8082 24.0323 12.9218 24.0323 12C24.0323 11.0782 23.6772 10.1919 23.0408 9.52501L19.1218 5.60601C18.8406 5.32461 18.4591 5.16648 18.0612 5.16638C17.6633 5.16629 17.2817 5.32425 17.0003 5.60551C16.719 5.88677 16.5608 6.2683 16.5607 6.66616C16.5606 7.06401 16.7186 7.44562 16.9998 7.72701L19.7798 10.508L1.52985 10.531C1.13202 10.531 0.750491 10.689 0.469186 10.9704C0.187881 11.2517 0.0298462 11.6332 0.0298462 12.031C0.0298462 12.4288 0.187881 12.8104 0.469186 13.0917C0.750491 13.373 1.13202 13.531 1.52985 13.531L19.7608 13.508L16.9998 16.273C16.7266 16.5559 16.5754 16.9348 16.5788 17.3281C16.5823 17.7214 16.74 18.0976 17.0181 18.3757C17.2962 18.6539 17.6725 18.8116 18.0657 18.815C18.459 18.8184 18.8379 18.6673 19.1208 18.394H19.1218Z"
        fill={color}
      />
    </svg>
  );
}