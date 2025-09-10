import { SplashCursor } from "./splash-cursor";

export function SplashCursorDemo() {
  return (
    <div className="relative min-h-screen bg-black">
      <SplashCursor 
        SIM_RESOLUTION={64}
        DYE_RESOLUTION={512}
        DENSITY_DISSIPATION={2.0}
        VELOCITY_DISSIPATION={1.5}
        SPLAT_RADIUS={0.3}
        SPLAT_FORCE={4000}
        COLOR_UPDATE_SPEED={15}
        SHADING={true}
      />
      
      <div className="relative z-10 flex items-center justify-center min-h-screen">
        <div className="text-center text-white">
          <h1 className="text-6xl font-bold mb-4 bg-gradient-to-r from-cyan-400 to-purple-500 bg-clip-text text-transparent">
            Fluid Cursor
          </h1>
          <p className="text-xl text-gray-300 mb-8">
            Move your mouse to create beautiful fluid effects
          </p>
          <div className="space-y-4">
            <div className="text-sm text-gray-400">
              <p>• Interactive WebGL fluid simulation</p>
              <p>• Responsive to mouse and touch input</p>
              <p>• Customizable parameters</p>
              <p>• Smooth animations</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
