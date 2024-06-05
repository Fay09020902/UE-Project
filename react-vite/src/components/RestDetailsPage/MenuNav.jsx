export default function MenuNav({ types }) {
	return (
		<div className="RestDetails__nav">
			{types.map((type) => (
				<a href={`#${type[0].type}`} key={type[0].type} className="RestDetails__anchor" >
					{type[0].type}
				</a>
			))}
		</div>
	);
}
