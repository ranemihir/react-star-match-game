import { utils } from './../utils';

export const StarDisplay = (props) => (
    <>
        {utils.range(1, props.stars).map(starId => (
            <div className='col-4' style={{
                color: '#fec84e'
            }}>
                <h1 class="d-inline-block m-2">
                    <i key={starId} class="bi bi-star-fill"></i>
                </h1>
            </div>
        ))}
    </>
);