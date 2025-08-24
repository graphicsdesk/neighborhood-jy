const layers = {
    // Base maps
    nycBase: d3.selectAll('[class*="nyc-img"]'),
    manhattanBase: d3.selectAll('[class*="manhattan-img"]'),
    council: d3.selectAll('[class*="council-img"]'),

    // Neighborhood outlines/images
    cb9Outline: d3.selectAll('[class*="cb9-img"]'),
    neighborhoods: d3.selectAll('[class*="neighborhoods-img"]'),
    manhattanville: d3.selectAll('[class*="manhattanville-img"]'),
    hamilton: d3.selectAll('[class*="hamilton-img"]'),
    morningside: d3.selectAll('[class*="morningside-img"]'),
    columbia: d3.selectAll('[class*="columbia-img"]'),

    // Labels
    labels: {
        cb9: d3.selectAll(".g-cb9"),
        manhattan: d3.selectAll(".g-manhattan"),
        council: d3.selectAll(".g-council"),
        manhattanville: d3.selectAll(".g-manhattanville"),
        hamilton: d3.selectAll(".g-hamilton"),
        morningside: d3.selectAll(".g-morningside"),
        columbia: d3.selectAll(".g-columbia"),
    }
};


// ---- Helper functions ----
function reset() {
    // Show only the NYC base map
    layers.nycBase.classed("hidden", false).classed("zoom", false);

    // Hide all other image layers
    layers.manhattanBase.classed("hidden", true).classed("zoom", false);
    layers.council.classed("hidden", true);
    layers.cb9Outline.classed("hidden", true);
    layers.neighborhoods.classed("hidden", true);
    layers.manhattanville.classed("hidden", true);
    layers.hamilton.classed("hidden", true);
    layers.morningside.classed("hidden", true);
    layers.columbia.classed("hidden", true);

    // Hide all labels
    Object.values(layers.labels).forEach(sel => sel.classed("hidden", true));
}


function zoomManhattan() {
    layers.nycBase.classed("hidden", true);

    layers.labels.manhattan.classed("hidden", false);
    layers.manhattanBase.classed("hidden", false);

    layers.council.classed("hidden", true);
    layers.labels.council.classed("hidden", true);
}

function zoomCouncil() {
    layers.manhattanBase.classed("hidden", true);
    layers.labels.manhattan.classed("hidden", true);

    layers.council.classed("hidden", false);
    layers.labels.council.classed("hidden", false);

    layers.labels.cb9.classed("hidden", true);
    layers.cb9Outline.classed("hidden", true);
}

function fadeCB9() {
    // layers.manhattanBase.classed("fade_out", true);
    layers.council.classed("hidden", true);
    layers.labels.council.classed("hidden", true);

    layers.labels.cb9.classed("hidden", false);
    layers.cb9Outline.classed("hidden", false);
    layers.cb9Outline.classed("fade_out", false);

    layers.neighborhoods.classed("hidden", true);

    layers.labels.morningside.classed("hidden", true);
    layers.morningside.classed("hidden", true);
}

function zoomCB9() {
    layers.cb9Outline.classed("fade_out", true);
    layers.cb9Outline.classed("hidden", true);

    layers.labels.cb9.classed("hidden", true);
    layers.neighborhoods.classed("hidden", false);
    layers.morningside.classed("hidden", true);
}

function showMorningside() {
    zoomCB9();
    layers.labels.morningside.classed("hidden", false);
    layers.morningside.classed("hidden", false);

    layers.columbia.classed("hidden", true);

    layers.manhattanville.classed("hidden", true);
    layers.labels.manhattanville.classed("hidden", true);
}

function showManhattanville() {
    layers.manhattanville.classed("hidden", false);
    layers.labels.manhattanville.classed("hidden", false);

    layers.morningside.classed("hidden", true);
    layers.labels.morningside.classed("hidden", true);

    layers.hamilton.classed("hidden", true);
    layers.labels.hamilton.classed("hidden", true);

}

function showHamilton() {
    layers.hamilton.classed("hidden", false);
    layers.labels.hamilton.classed("hidden", false);

    layers.manhattanville.classed("hidden", true);
    layers.labels.manhattanville.classed("hidden", true);

    layers.labels.morningside.classed("hidden", true);
    layers.morningside.classed("hidden", true);
}

function showAll() {
    layers.labels.morningside.classed("hidden", false);
    layers.morningside.classed("hidden", false);

    layers.manhattanville.classed("hidden", false);
    layers.labels.manhattanville.classed("hidden", false);

    layers.hamilton.classed("hidden", false);
    layers.labels.hamilton.classed("hidden", false);

    layers.columbia.classed("hidden", true);
    layers.labels.columbia.classed("hidden", true);
}

function showColumbia() {
    layers.columbia.classed("hidden", false);
    layers.labels.columbia.classed("hidden", false);
}

// ---- Scrollama setup ----
const scroller = scrollama();

// Bind scroll steps
const steps = [
    { id: "#step-0", action: reset },
    { id: "#step-1", action: zoomManhattan },
    { id: "#step-3", action: zoomManhattan },
    { id: "#step-4", action: zoomCouncil },
    { id: "#step-5", action: fadeCB9 },
    { id: "#step-5a", action: showMorningside },
    { id: "#step-6", action: showManhattanville },
    { id: "#step-10", action: showManhattanville },
    { id: "#step-11", action: showHamilton },
    { id: "#step-13", action: showAll },
    { id: "#step-22", action: showAll },
    { id: "#step-23", action: showColumbia },
];

reset()

steps.forEach(({ id, action }) => {
    d3.select(id).on("stepin", action);
});


scroller
    .setup({
        step: "#scrolly .scrolly-overlay .step",
        offset: 0.5,
        debug: false
    })
    .onStepEnter(({ element, direction }) => {
        element.dispatchEvent(new CustomEvent("stepin", { detail: { direction } }));
    })
    .onStepExit(({ element, direction }) => {
        element.dispatchEvent(new CustomEvent("stepout", { detail: { direction } }));
    });

window.addEventListener("resize", scroller.resize);
