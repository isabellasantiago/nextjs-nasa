export const Divider = ({ text = 'OR', size = "max-w-xl" }: { text?: string, size?: string }) => {
    return (
        <div className={`flex items-center justify-center w-full ${size} text-slate-400 gap-6`}>
            <div className="w-full border-solid border border-slate-400" />
            {text}
            <div className="w-full border-solid border border-slate-400" />
        </div>
    )
}