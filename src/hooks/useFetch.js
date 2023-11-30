import useSWRImmutable from "swr/immutable";
import cacheBustingString from "~/utils/cacheBustingString";

const fetcher = (...args) => fetch(...args).then((res) => res.json());

export default function useFetch(url = "") {
	return useSWRImmutable(cacheBustingString(url), fetcher);
}
