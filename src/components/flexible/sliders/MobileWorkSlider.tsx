import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";
import "swiper/css/free-mode";
import WpImage from "~/components/elements/WpImage";
import FontSwitcher from "~/components/elements/animations/helpers/FontSwitcher";
import { getBgColorClasses } from "~/utils/getColors";
import { TextLink } from "~/components/elements/buttons/Button";
import Link from "next/link";

const MobileWorkSlider = (props) => {
	const { work_slides } = props;

	return (
		<div className="container w-full overflow-x-clip ">
			<Swiper
				className="!overflow-visible"
				slidesPerView={3}
				spaceBetween={15}
				grabCursor
				pagination={{ clickable: true }}
				direction="horizontal"
				mousewheel={{ forceToAxis: true }}
				breakpoints={{
					"@0.00": {
						slidesPerView: 1.1,
						spaceBetween: 15,
					},
					"@0.6": {
						slidesPerView: 1.1,
						spaceBetween: 15,
					},
					"@1.00": {
						slidesPerView: 1.512,
						spaceBetween: 40,
					},
				}}
			>
				{work_slides?.map((slide, i) => (
					<SwiperSlide key={`item-${i}`} className="!flex !h-auto min-h-[580px] flex-col overflow-hidden  sm:min-h-[350px] md:!min-h-[443px]">
						<div id={`slide${i}`} key={`slide-image${i}`} className="aspect-[600/400] w-full overflow-hidden">
							<WpImage image={slide?.work?.acf?.previews?.slider_image || slide?.work?.featured_image} className="h-full w-full object-cover" />
						</div>

						<div className={`flex flex-1 flex-col justify-between gap-5 p-6  px-3 ${getBgColorClasses(slide?.work?.acf?.general?.theme_color)}`}>
							<div className="flex flex-col gap-5">
								<WpImage
									image={slide?.work?.acf?.work_logos?.light_logo}
									className="flex max-h-[20px] max-w-[200px] justify-start object-contain object-left"
								/>
								<h2 className="t-64 max-w-[90%] uppercase xl:max-w-[100%]">
									<FontSwitcher text={slide?.work?.acf?.work_masthead?.heading} />
								</h2>
								<div className="t-22 max-w-[90%]">{slide?.work?.acf?.previews?.excerpt}</div>
							</div>
							<Link href={slide?.work?.permalink}>
								<TextLink>Learn more</TextLink>
							</Link>
						</div>
					</SwiperSlide>
				))}
			</Swiper>
		</div>
	);
};
export default MobileWorkSlider;
