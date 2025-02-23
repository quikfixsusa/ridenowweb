export default function Facebook({ size, color }: { size: number; color: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        fill={color}
        d="M100,50.18C100,22.57,77.61,.18,50,.18S0,22.57,0,50.18c0,23.45,16.14,43.12,37.92,48.53v-33.25h-10.31v-15.28h10.31v-6.58c0-17.02,7.7-24.91,24.41-24.91,3.17,0,8.63,.62,10.87,1.24v13.85c-1.18-.12-3.23-.19-5.78-.19-8.2,0-11.37,3.11-11.37,11.18v5.4h16.33l-2.81,15.28h-13.53v34.35c24.76-2.99,43.94-24.07,43.94-49.63"
      />
    </svg>
  );
}
