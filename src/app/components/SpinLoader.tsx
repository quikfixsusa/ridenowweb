const SpinLoader = () => {
  return (
    <svg
      className="w-9 animate-spin"
      xmlns="http://www.w3.org/2000/svg"
      xmlnsXlink="http://www.w3.org/1999/xlink"
      viewBox="0 0 82.03 80.76"
    >
      <defs>
        <style>{'.cls-8{fill:none;}.cls-9{clip-path:url(#clip-path);}.cls-10{clip-path:url(#clip-path-2);}'}</style>
        <clipPath id="clip-path">
          <path className="cls-8" d="M66.28,40.63l0-.25,0-.75a7.22,7.22,0,0,1,14.42.75l0,.39Z" />
        </clipPath>
        <clipPath id="clip-path-2">
          <path className="cls-8" d="M80.74,40l0,.4a7.22,7.22,0,0,1-14.42.76l0-.76,0-.26Z" />
        </clipPath>
      </defs>
      <g id="Capa_2" data-name="Capa 2">
        <g id="Capa_1-2" data-name="Capa 1">
          <g className="cls-9">
            <image
              width="17"
              height="31"
              transform="translate(65.96 10.99)"
              xlinkHref="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABEAAAAfCAYAAAABZyaKAAAACXBIWXMAAAsSAAALEgHS3X78AAAAWklEQVRIS+3UsQ2AMAwF0TM7sEAGYfgMkgUyhCkClZFAfJe+yoX15Mrm7gDs7VjDjzbQALgQpTm6yQgkXAKFPFVIrJBYDqI+JMi65G3hSxIyRzcQkbtCYoXETl0CDK9Fq5htAAAAAElFTkSuQmCC"
            />
          </g>
          <image
            width="81"
            height="81"
            transform="translate(-0.04 -0.01)"
            xlinkHref="data:image/png;base64,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"
          />
          <g className="cls-10">
            <image
              width="17"
              height="31"
              transform="translate(65.96 38.99)"
              xlinkHref="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABEAAAAfCAYAAAABZyaKAAAACXBIWXMAAAsSAAALEgHS3X78AAAAWUlEQVRIS+3VIRLAIAxE0YUbFlFMOR2qpldMFYNYAUMQiH068ycmk3Ddj2HR99YAAHE0OEMRpghzRVIuBjgjzZ5IOyKPPZuMBmYowhRhirAzIikXi0D/7qt+c8YMOz8VBB4AAAAASUVORK5CYII="
            />
          </g>
        </g>
      </g>
    </svg>
  );
};

export default SpinLoader;
