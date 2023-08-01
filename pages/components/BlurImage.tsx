// React
import { useState } from 'react';

// Next.js
import Image from 'next/image';

function cn(...classes : any[]) {
  return classes.filter(Boolean).join(' ');
}

function BlurImage({ src, alt, fill, height, width, ...props } : {src : string, alt: string, fill: boolean, height: number, width: number, props : any[]}) {

  const [isLoading, setLoading] = useState(true);

  return (
    <Image
      {...props}
      height={height}
      width={width}
      fill={fill}
      src={src}
      alt={alt}
      className={cn(
        'duration-700 ease-in-out',
        isLoading
          ? 'grayscale blur-2xl scale-110'
          : 'grayscale-0 blur-0 scale-100'
      )}
      onLoadingComplete={() => setLoading(false)}
    />
  );
}

export default BlurImage;