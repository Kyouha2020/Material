(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
        typeof define === 'function' && define.amd ? define(factory) : (global = global || self, global.ripple = factory());
}(this, () => {
    const ripple = (_a, _options) => {
        const defaultOptions = {
            className: '',
            color: getComputedStyle(_a.currentTarget).color,
            opacity: .1,
            spreadingDuration: '350ms',
            spreadingDelay: '0s',
            spreadingTimingFunction: 'linear',
            clearingDuration: '700ms',
            clearingDelay: '0s',
            clearingTimingFunction: 'ease-in-out',
            centered: false,
            appendTo: 'body',
        }

        let currentTarget = _a.currentTarget, clientX = _a.clientX, clientY = _a.clientY;
        if (!(currentTarget instanceof Element)) return
        const options = _options ? Object.keys(defaultOptions).reduce(function (merged, field) {
            return (merged[field] = _options.hasOwnProperty(field) ? _options[field] : defaultOptions[field], merged);
        }, {}) : defaultOptions;
        const targetRect = currentTarget.getBoundingClientRect();
        if (options.centered && options.centered !== 'false') {
            clientX = targetRect.left + targetRect.width * .5;
            clientY = targetRect.top + targetRect.height * .5;
        } else if (typeof clientX !== 'number' || typeof clientY !== 'number') return
        const documentElement = document.documentElement, body = document.body;
        const containerElement = document.createElement('div');
        let removingElement = containerElement;
        {
            const appendToParent = options.appendTo === 'parent';
            const targetStyle = getComputedStyle(currentTarget);
            const containerStyle = containerElement.style;
            if (targetStyle.position === 'fixed' || (targetStyle.position === 'absolute' && appendToParent)) {
                if (appendToParent)
                    currentTarget.parentElement.insertBefore(containerElement, currentTarget);
                else
                    body.appendChild(containerElement);
                copyStyles(containerStyle, targetStyle, ['position', 'left', 'top', 'right', 'bottom', 'marginLeft', 'marginTop', 'marginRight', 'marginBottom']);
            } else if (appendToParent) {
                const parentStyle = getComputedStyle(currentTarget.parentElement);
                if (parentStyle.display === 'flex' || parentStyle.display === 'inline-flex') {
                    currentTarget.parentElement.insertBefore(containerElement, currentTarget);
                    containerStyle.position = 'absolute';
                    containerStyle.left = currentTarget.offsetLeft + "px";
                    containerStyle.top = currentTarget.offsetTop + "px";
                } else {
                    const containerContainer = removingElement = currentTarget.parentElement.insertBefore(document.createElement('div'), currentTarget);
                    const containerContainerStyle = containerContainer.style;
                    containerContainerStyle.display = 'inline-block';
                    containerContainerStyle.position = 'relative';
                    containerContainerStyle.width = containerContainerStyle.height = '0';
                    containerContainerStyle.cssFloat = targetStyle.cssFloat;
                    const containerContainerRect = containerContainer.getBoundingClientRect(); // this may be a slow operation...
                    containerContainer.appendChild(containerElement);
                    containerStyle.position = 'absolute';
                    containerStyle.top = targetRect.top - containerContainerRect.top + "px";
                    containerStyle.left = targetRect.left - containerContainerRect.left + "px";
                }
            } else {
                body.appendChild(containerElement);
                containerStyle.position = 'absolute';
                containerStyle.left = targetRect.left + documentElement.scrollLeft + body.scrollLeft + "px";
                containerStyle.top = targetRect.top + documentElement.scrollTop + body.scrollTop + "px";
            }
            containerStyle.overflow = 'hidden';
            containerStyle.pointerEvents = 'none';
            containerStyle.width = targetRect.width + "px";
            containerStyle.height = targetRect.height + "px";
            containerStyle.zIndex = "" + ((parseInt(targetStyle.zIndex, 10) || 0) + 1);
            containerStyle.opacity = options.opacity;
            copyStyles(containerStyle, targetStyle, ['borderTopLeftRadius', 'borderTopRightRadius', 'borderBottomLeftRadius', 'borderBottomRightRadius', 'webkitClipPath', 'clipPath']);
        }
        {
            const distanceX = Math.max(clientX - targetRect.left, targetRect.right - clientX);
            const distanceY = Math.max(clientY - targetRect.top, targetRect.bottom - clientY);
            const radius = Math.sqrt(distanceX * distanceX + distanceY * distanceY);
            const rippleElement = containerElement.appendChild(document.createElement('div'));
            const rippleStyle = rippleElement.style;
            rippleElement.className = options.className;
            rippleStyle.backgroundColor = options.color;
            rippleStyle.width = rippleStyle.height = radius * 2 + "px";
            rippleStyle.marginLeft = clientX - targetRect.left - radius + "px";
            rippleStyle.marginTop = clientY - targetRect.top - radius + "px";
            rippleStyle.borderRadius = '50%';
            rippleStyle.transition = "transform " + options.spreadingDuration + " " + options.spreadingTimingFunction + " " + options.spreadingDelay + (",opacity " + options.clearingDuration + " " + options.clearingTimingFunction + " " + options.clearingDelay);
            rippleStyle.transform = 'scale(0)';
            // reflect styles by force layout
            rippleElement.offsetTop;
            rippleElement.addEventListener('transitionend', function (event) {
                if (event.propertyName === 'opacity' && removingElement.parentElement)
                    removingElement.parentElement.removeChild(removingElement);
            });
            rippleStyle.transform = '';
            rippleStyle.opacity = '0';
        }
        return containerElement;
    }

    const copyStyles = (destination, source, properties) => {
        for (let _i = 0, properties_1 = properties; _i < properties_1.length; _i++) {
            const property = properties_1[_i]
            destination[property] = source[property]
        }
    }

    const getX = (event, currentTarget) => {
        let x
        if (event.type === 'mousedown')
            x = event.clientX
        else if (event.type === 'touchstart')
            x = event.touches[0].clientX
        else if (event.keyCode === 32)
            x = currentTarget.getBoundingClientRect().left + currentTarget.getBoundingClientRect().width / 2
        return x
    }

    const getY = (event, currentTarget) => {
        let y
        if (event.type === 'mousedown')
            y = event.clientY
        else if (event.type === 'touchstart')
            y = event.touches[0].clientY
        else if (event.keyCode === 32)
            y = currentTarget.getBoundingClientRect().top + currentTarget.getBoundingClientRect().height / 2
        return y
    }

    const rippleListener = event => {
        const currentTarget = event.target.closest('.mtrl-ripple');
        if (currentTarget)
            ripple({
                currentTarget: currentTarget,
                clientX: getX(event, currentTarget),
                clientY: getY(event, currentTarget)
            }, currentTarget.classList.contains('mtrl-ripple'))
    }

    const touch = ('ontouchstart' in document.documentElement) ? 'touchstart' : 'mousedown'
    const options = ('ontouchstart' in document.documentElement) ? {'passive': true} : null
    addEventListener(touch, rippleListener, options)
    addEventListener('keydown', rippleListener)

    return ripple
}))
