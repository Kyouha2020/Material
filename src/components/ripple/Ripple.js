(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
        typeof define === 'function' && define.amd ? define(factory) : (global = global || self, global.ripple = factory());
}(this, () => {
    function ripple(_a, _options) {
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
        };

        let currentTarget = _a.currentTarget, clientX = _a.clientX, clientY = _a.clientY;
        if (!(currentTarget instanceof Element)) {
            return;
        }
        const options = _options
            ? Object.keys(defaultOptions).reduce(function (merged, field) {
                return (merged[field] = _options.hasOwnProperty(field) ? _options[field] : defaultOptions[field], merged);
            }, {})
            : defaultOptions;
        const targetRect = currentTarget.getBoundingClientRect();
        if (options.centered && options.centered !== 'false') {
            clientX = targetRect.left + targetRect.width * .5;
            clientY = targetRect.top + targetRect.height * .5;
        } else if (typeof clientX !== 'number' || typeof clientY !== 'number') {
            return;
        }
        const documentElement = document.documentElement, body = document.body;
        const containerElement = document.createElement('div');
        let removingElement = containerElement;
        {
            const appendToParent = options.appendTo === 'parent';
            const targetStyle = getComputedStyle(currentTarget);
            const containerStyle = containerElement.style;
            if (targetStyle.position === 'fixed' || (targetStyle.position === 'absolute' && appendToParent)) {
                if (appendToParent) {
                    currentTarget.parentElement.insertBefore(containerElement, currentTarget);
                } else {
                    body.appendChild(containerElement);
                }
                copyStyles(containerStyle, targetStyle, ['position', 'left', 'top', 'right', 'bottom', 'marginLeft', 'marginTop', 'marginRight', 'marginBottom']);
            } else if (appendToParent) {
                const parentStyle = getComputedStyle(currentTarget.parentElement);
                if (parentStyle.display === 'flex' || parentStyle.display === 'inline-flex') {
                    currentTarget.parentElement.insertBefore(containerElement, currentTarget);
                    containerStyle.position = 'absolute';
                    containerStyle.left = currentTarget.offsetLeft + "px";
                    containerStyle.top = currentTarget.offsetTop + "px";
                } else {
                    const containerContainer = removingElement
                        = currentTarget.parentElement.insertBefore(document.createElement('div'), currentTarget);
                    const containerContainerStyle = containerContainer.style;
                    containerContainerStyle.display = 'inline-block';
                    containerContainerStyle.position = 'relative';
                    containerContainerStyle.width = containerContainerStyle.height
                        = '0';
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
            rippleStyle.width = rippleStyle.height
                = radius * 2 + "px";
            rippleStyle.marginLeft = clientX - targetRect.left - radius + "px";
            rippleStyle.marginTop = clientY - targetRect.top - radius + "px";
            rippleStyle.borderRadius = '50%';
            rippleStyle.transition =
                "transform " + options.spreadingDuration + " " + options.spreadingTimingFunction + " " + options.spreadingDelay +
                (",opacity " + options.clearingDuration + " " + options.clearingTimingFunction + " " + options.clearingDelay);
            rippleStyle.transform = 'scale(0)';
            // reflect styles by force layout
            // tslint:disable-next-line:no-unused-expression
            rippleElement.offsetTop;
            rippleElement.addEventListener('transitionend', function (event) {
                if (event.propertyName === 'opacity' && removingElement.parentElement) {
                    removingElement.parentElement.removeChild(removingElement);
                }
            });
            rippleStyle.transform = '';
            rippleStyle.opacity = '0';
        }
        return containerElement;
    }

    function copyStyles(destination, source, properties) {
        for (let _i = 0, properties_1 = properties; _i < properties_1.length; _i++) {
            const property = properties_1[_i];
            destination[property] = source[property];
        }
    }

    // use passive event listener if possible
    let eventListenerOptions = true;
    {
        const testOptions = {
            get passive() {
                eventListenerOptions = {passive: true, capture: true};
                return true;
            },
        };
        const noop = function () {
        };
        addEventListener('test', noop, testOptions);
        removeEventListener('test', noop, testOptions);
    }
    addEventListener('mousedown', function (event) {
        if (event.button !== 0) {
            return;
        }
        const currentTarget = findrippleTarget(event.target);
        if (currentTarget) {
            ripple({
                currentTarget: currentTarget,
                clientX: event.clientX,
                clientY: event.clientY
            }, parseOptions(currentTarget.getAttribute('data-mtrl-ripple')));
        }
    }, eventListenerOptions);

    function parseOptions(optionsString) {
        if (!optionsString) {
            return;
        }
        const options = {};
        for (let _i = 0, _a = optionsString.split(';'); _i < _a.length; _i++) {
            const s = _a[_i];
            const index = s.indexOf(':');
            options[s.slice(0, index).trim().replace(/[a-zA-Z0-9_]-[a-z]/g, function ($0) {
                return $0[0] + $0[2].toUpperCase();
            })] = s.slice(index + 1).trim();
        }
        return options;
    }

    // Element.prototype.closest is not implemented in IE
    // https://caniuse.com/#feat=element-closest
    function findrippleTarget(element) {
        while (element && !element.hasAttribute('data-mtrl-ripple')) {
            element = element.parentElement;
        }
        return element;
    }

    return ripple;

}));
