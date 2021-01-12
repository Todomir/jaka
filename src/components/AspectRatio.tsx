interface AspectRatioProps {
  ratio: number
}

const AspectRatio: React.FC<AspectRatioProps> = ({ ratio, children }) => {
  return (
    <div
      style={{ paddingBottom: `${(1 / ratio) * 100}%` }}
      className="relative w-full h-0"
    >
      <div className="absolute inset-0 flex items-center justify-center">
        {children}
      </div>
    </div>
  )
}

export default AspectRatio
