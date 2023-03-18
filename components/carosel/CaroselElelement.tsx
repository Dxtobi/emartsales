
import { profile } from 'console';
import Carousel from 'nuka-carousel/lib/carousel';
import { Key } from 'react';
import IndeCard from '../cards/IndeCard';

const img = ['images/bn.png', 'images/bn1.png', 'images/bn2.png']

export default function CarouselElement(params: { products: any; }) {

    const {products} = params
  
    return (
        <Carousel
            
            renderCenterLeftControls={({ previousDisabled, previousSlide }) => (
                <button className='w-[100px] h-[300px]' onClick={previousSlide} disabled={previousDisabled}>
                
                </button>
            )}
            renderCenterRightControls={({ nextDisabled, nextSlide }) => (
                <button
                    className='w-[100px] h-[300px]'
                    onClick={nextSlide} disabled={nextDisabled}>
                </button>
            )}
            animation="zoom"
            autoplay={true}
            autoplayReverse={true}
            //autoplayInterval={50}
            >
            {
                img.map((product: any, index: Key | null | undefined) => (
                    <IndeCard img={product} key={index} />
                ))
            }
            </Carousel>
                )
}