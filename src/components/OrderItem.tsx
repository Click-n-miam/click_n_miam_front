
export default function OrderItem({imageUrl, label, name}: {imageUrl: string, label: string, name: string}){


    return (
        <div className="flex items-center space-x-2">
            <div className="w-8 h-8 rounded-md overflow-hidden flex-shrink-0">
                <img src={imageUrl} alt={name} className="w-full h-full object-cover" />
            </div>
            <div>
                <span className="text-gray-500">{label}:</span>{' '}
                <span className="text-gray-800">{name}</span>
            </div>
        </div>
    )
}