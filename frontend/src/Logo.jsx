
import './Logo.css'


function Logo() {

    return (
        <>
            <div class="container">
                <svg viewBox="0 0 960 300">
                    <symbol id="s-text">
                        <text text-anchor="middle" x="50%" y="80%">l̲a̲n̲.̲k̲a̲/̲</text>
                    </symbol>

                    <g class="g-ants">
                        <use xlinkHref="#s-text" class="text-copy"></use>
                        <use xlinkHref="#s-text" class="text-copy"></use>
                        <use xlinkHref="#s-text" class="text-copy"></use>
                        <use xlinkHref="#s-text" class="text-copy"></use>
                        <use xlinkHref="#s-text" class="text-copy"></use>
                    </g>
                </svg>
            </div>
        </>
    );
}

export default Logo;