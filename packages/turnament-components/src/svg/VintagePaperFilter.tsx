export const VintagePaperFilter = () => (
	// biome-ignore lint/a11y/noSvgWithoutTitle: <explanation>
	<svg xmlns="http://www.w3.org/2000/svg" version="1.1" height="0" width="0">
		<defs>
			<filter id="vintagePaper">
				{/* Base noise texture */}
				<feTurbulence
					type="fractalNoise"
					baseFrequency="0.04"
					numOctaves="5"
					stitchTiles="stitch"
					result="noise"
				/>

				{/* Color the noise to paper-like tones */}
				<feColorMatrix
					in="noise"
					type="matrix"
					values="0.1 0 0 0 0.95
                  0 0.1 0 0 0.9
                  0 0 0.1 0 0.8
                  0 0 0 1 0"
					result="coloredNoise"
				/>

				{/* Subtle displacement for texture */}
				<feDisplacementMap
					in="SourceGraphic"
					in2="noise"
					scale="3"
					result="displacedImage"
				/>

				{/* Blend with original content */}
				<feBlend
					mode="multiply"
					in="coloredNoise"
					in2="displacedImage"
					result="blendedImage"
				/>

				{/* Add light speckles */}
				<feTurbulence
					type="turbulence"
					baseFrequency="0.8"
					numOctaves="3"
					stitchTiles="stitch"
					result="speckles"
				/>
				<feColorMatrix
					in="speckles"
					type="matrix"
					values="0 0 0 0 0
                  0 0 0 0 0
                  0 0 0 0 0
                  0 0 0 0.03 0"
					result="coloredSpeckles"
				/>

				{/* Final blend */}
				<feBlend mode="multiply" in="blendedImage" in2="coloredSpeckles" />
			</filter>
		</defs>
	</svg>
);
