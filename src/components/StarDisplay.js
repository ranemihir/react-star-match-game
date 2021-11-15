export const StarDisplay = (props) => (
    <>
        {utils.range(1, props.stars).map(starId => (
            <div key={starId} className="star" />
        ))}
    </>
);