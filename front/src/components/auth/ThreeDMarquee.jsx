import React from "react";

export const ThreeDMarquee = ({
  images,
  className = "",
  cols = 4,
  onImageClick,
}) => {
  // Clone the image list twice
  const duplicatedImages = [...images, ...images];
  const groupSize = Math.ceil(duplicatedImages.length / cols);
  const imageGroups = Array.from({ length: cols }, (_, index) =>
    duplicatedImages.slice(index * groupSize, (index + 1) * groupSize)
  );

  const handleImageClick = (image, globalIndex) => {
    if (onImageClick) {
      onImageClick(image, globalIndex);
    } else if (image.href) {
      window.open(image.href, image.target || "_self");
    }
  };

  return (
    <section
      className={`mx-auto block h-[600px] max-sm:h-[400px] 
        overflow-hidden rounded-2xl bg-white dark:bg-black ${className}`}
    >
      <div
        className="flex w-full h-full items-center justify-center"
        style={{
          transform: "rotateX(55deg) rotateY(0deg) rotateZ(45deg)",
        }}
      >
        <div className="w-full overflow-hidden scale-90 sm:scale-100">
          <div
            className={`relative grid h-full w-full origin-center 
              grid-cols-2 sm:grid-cols-${cols} gap-4 transform 
              `}
          >
            {imageGroups.map((imagesInGroup, idx) => (
              <div
                key={`column-${idx}`}
                className="flex flex-col items-center gap-6 relative animate-marquee"
                style={{
                  animation: `marqueeMove ${idx % 2 === 0 ? '10' : '15'}s linear infinite alternate`,
                  animationDelay: `${idx * 0.5}s`
                }}
              >
                <div className="absolute left-0 top-0 h-full w-0.5 bg-gray-200 dark:bg-gray-700" />
                {imagesInGroup.map((image, imgIdx) => {
                  const globalIndex = idx * groupSize + imgIdx;
                  const isClickable = image.href || onImageClick;
                  return (
                    <div key={`img-${imgIdx}`} className="relative group">
                      <div className="absolute top-0 left-0 w-full h-0.5 bg-gray-200 dark:bg-gray-700" />
                      <img
                        src={image.src}
                        alt={image.alt}
                        width={970}
                        height={700}
                        className={`aspect-[970/700] w-full max-w-[200px] rounded-lg object-cover ring ring-gray-300/30 dark:ring-gray-800/50 shadow-xl transition-all duration-300 group-hover:shadow-2xl group-hover:-translate-y-2 ${
                          isClickable ? "cursor-pointer" : ""
                        }`}
                        onClick={() => handleImageClick(image, globalIndex)}
                      />
                    </div>
                  );
                })}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

// CSS en el componente para las animaciones
const style = document.createElement('style');
style.textContent = `
  @keyframes marqueeMove {
    0% { transform: translateY(100px); }
    100% { transform: translateY(-100px); }
  }
`;
document.head.appendChild(style);