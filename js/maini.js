// $(document).ready(function () {
//     $("#autoWidth").lightSlider({
//         autoWidth: true,
//         loop: true,
//         onSliderLoad: function () {
//             $("#autoWidth").removeClass("cS-hidden");
//         },
//     });
const circle = new mojs.Shape({
    left: 0,
    top: 0,
    strokeWidth: 8,
    fill: "none",
    radius: 80,
    scale: { 0: 1 },
    opacity: { 10: 0 },
    shape: "circle",
    stroke: "pink",
    strokeWidth: 8,
    fill: "none",
    duration: 500,
});
const burst = new mojs.Burst({
    count: 10,
    left: 0,
    top: 0,
    children: {
        shape: ["circle", "rect", "curve"],
        fill: ["yellow", "red", "green"],
        degreeShift: "rand(-360,360)",
        delay: "stagger(0,30)",
    },
    duration: 400,
});
document.onclick = (e) => {
    const postion = {
        x: e.pageX,
        y: e.pageY,
    };
    circle.tune(postion);
    circle.replay();
    burst.tune(postion);
    burst.replay();
};
// });
