import { TikTokEmbed as TikTok } from "react-social-media-embed";

const TikTokEmbed = ({ tiktok_url }) => {
	return (
		<div style={{ display: "flex", justifyContent: "center" }}>
			<TikTok url={tiktok_url || "https://www.tiktok.com/@epicgardening/video/7055411162212633903"} width={325} />
		</div>
	);
};
export default TikTokEmbed;
