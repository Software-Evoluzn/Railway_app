const stationsData = [
    {
        reachTime: 'Start',
        realReachTime: '....',
        stationName: 'Nagpur Junction',
        distance: '0 Km',
        platform: 'PF 7',
        departureTime1: '3:15 PM',
        departureTime2: '3:15 PM',
        track_pathImageId: ''
    },
    {
        reachTime: '3:23 PM',
        realReachTime: '3:23 PM',
        stationName: 'Ajni',
        distance: '2 Km',
        platform: 'PF 2',
        departureTime1: '3:24 PM',
        departureTime2: '3:24 PM',
        track_pathImageId: ''
    },
    {
        reachTime: '4:13 PM',
        realReachTime: '4:13 PM',
        stationName: 'Wardha Junction',
        distance: '78 Km',
        platform: 'PF 2',
        departureTime1: '4:15 PM',
        departureTime2: '4:15 PM',
        track_pathImageId: ''
    },
    {
        reachTime: '4:36 PM',
        realReachTime: '4:36 PM',
        stationName: 'Pulgaon',
        distance: '108 Km',
        platform: 'PF 1',
        departureTime1: '4:37 PM',
        departureTime2: '4:37 PM',
        track_pathImageId: ''
    },
    {
        reachTime: '4:36 PM',
        realReachTime: '4:36 PM',
        stationName: 'Pulgaon',
        distance: '108 Km',
        platform: 'PF 1',
        departureTime1: '4:37 PM',
        departureTime2: '4:37 PM',
        track_pathImageId: ''
    },
    {
        reachTime: '4:36 PM',
        realReachTime: '4:36 PM',
        stationName: 'Pulgaon',
        distance: '108 Km',
        platform: 'PF 1',
        departureTime1: '4:37 PM',
        departureTime2: '4:37 PM',
        track_pathImageId: ''
    },
    {
        reachTime: '4:36 PM',
        realReachTime: '4:36 PM',
        stationName: 'Pulgaon',
        distance: '108 Km',
        platform: 'PF 1',
        departureTime1: '4:37 PM',
        departureTime2: '4:37 PM',
        track_pathImageId: ''
    },
    {
        reachTime: '4:36 PM',
        realReachTime: '4:36 PM',
        stationName: 'Pulgaon',
        distance: '108 Km',
        platform: 'PF 1',
        departureTime1: '4:37 PM',
        departureTime2: '4:37 PM',
        track_pathImageId: ''
    },
    {
        reachTime: '4:36 PM',
        realReachTime: '4:36 PM',
        stationName: 'Pulgaon',
        distance: '108 Km',
        platform: 'PF 1',
        departureTime1: '4:37 PM',
        departureTime2: '4:37 PM',
        track_pathImageId: ''
    },
    {
        reachTime: '4:36 PM',
        realReachTime: '4:36 PM',
        stationName: 'Pulgaon',
        distance: '108 Km',
        platform: 'PF 1',
        departureTime1: '4:37 PM',
        departureTime2: '4:37 PM',
        track_pathImageId: ''
    },
    {
        reachTime: '4:36 PM',
        realReachTime: '4:36 PM',
        stationName: 'Pulgaon',
        distance: '108 Km',
        platform: 'PF 1',
        departureTime1: '4:37 PM',
        departureTime2: '4:37 PM',
        track_pathImageId: ''
    },
];

// Dynamically assign track_pathImageId with index
stationsData.forEach((station, index) => {
    station.track_pathImageId = `track_path-${index}`;
});

// Function to generate station HTML dynamically
function generateStations() {
    const container = document.getElementById('stations-container');
    stationsData.forEach(station => {
        const stationHtml = `
                    <div class="station d-flex mb-4 align-items-center position-relative">
                        <div class="track_path_reach_box flex">
                            <div class="track_path_reach_time text-success me-3">${station.reachTime}</div>
                            <div class="real_reach_time text-success">${station.realReachTime}</div>
                        </div>
    
                        <!-- track_path connecting the station details -->
                        <div class="track_path position-absolute top-50 translate-middle-y">
                            <div class="track_path_dot position-absolute top-50 start-50 translate-middle"></div>
                            <img src="../static/img/track_train.svg" alt="track_path image" class="position-absolute top-50 start-50 translate-middle" id="${station.track_pathImageId}" style="display: none;" />
                        </div>
    
                        <div class="track_path_station_details flex-grow-1">
                            ${station.stationName}<br>${station.distance} <span class="badge bg-primary">${station.platform}</span>
                        </div>
    
                        <div class="track_path_departure_box d-flex flex-column text-end">
                            <div class="text-success">${station.departureTime1}</div>
                            <div class="text-success">${station.departureTime2}</div>
                        </div>
                    </div>
                `;
        container.innerHTML += stationHtml;
    });
}

let now = 3;

// Function to update the track_paths visibility
function updatetrack_paths() {
    stationsData.forEach((station, index) => {
        const track_pathImage = document.getElementById(station.track_pathImageId);
        if (track_pathImage) {
            track_pathImage.style.display = 'none'; // Hide all initially
        }
    });

    // Show Image for the current station
    const currenttrack_path = document.getElementById(`track_path-${now - 1}`);
    if (currenttrack_path) {
        currenttrack_path.style.display = 'block';
    }
}

window.onload = function () {
    generateStations();
    updatetrack_paths();
};