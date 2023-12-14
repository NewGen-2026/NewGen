/* eslint-disable import/prefer-default-export */
import { createContext, useContext } from "react";

const VideoLoadedContext = createContext({
	videoLoaded: false,
	setVideoLoaded: () => {},
});

export const useVideoLoaded = () => useContext(VideoLoadedContext);
