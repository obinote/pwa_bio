export default function matchesCurrentHost(href) {
    try {
        const url = new URL(href);
        return url.host === window.location.host;
    } catch (_) {
        return true;
    }
}
