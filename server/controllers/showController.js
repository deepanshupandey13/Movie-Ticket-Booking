// // import axios from "axios";
// // import Movie from "../models/Movie.js";
// // import Show from "../models/Show.js";
// // import { inngest } from "../inngest/index.js";

// // // API to get now playing movies from TMDB API
// // export const getNowPlayingMovies = async (req, res) => {
// //   try {
// //     const { data } = await axios.get(
// //       "https://api.themoviedb.org/3/movie/now_playing",
// //       {
// //         headers: { Authorization: `Bearer ${process.env.TMDB_API_KEY}` },
// //       }
// //     );

// //     const movies = data.results;
// //     res.json({ success: true, movies: movies });
// //   } catch (error) {
// //     console.error(error);
// //     res.json({ success: false, message: error.message });
// //   }
// // };

// // // API to add a new show to the database
// // export const addShow = async (req, res) => {
// //   try {
// //     const { movieId, showsInput, showPrice } = req.body;

// //     let movie = await Movie.findById(movieId);

// //     if (!movie) {
// //       // Fetch movie details and credits from TMDB API
// //       const [movieDetailsResponse, movieCreditsResponse] = await Promise.all([
// //         axios.get(`https://api.themoviedb.org/3/movie/${movieId}`, {
// //           headers: { Authorization: `Bearer ${process.env.TMDB_API_KEY}` },
// //         }),

// //         axios.get(`https://api.themoviedb.org/3/movie/${movieId}/credits`, {
// //           headers: { Authorization: `Bearer ${process.env.TMDB_API_KEY}` },
// //         }),
// //       ]);

// //       const movieApiData = movieDetailsResponse.data;
// //       const movieCreditsData = movieCreditsResponse.data;

// //       const movieDetails = {
// //         _id: movieId,
// //         title: movieApiData.title,
// //         overview: movieApiData.overview,
// //         poster_path: movieApiData.poster_path,
// //         backdrop_path: movieApiData.backdrop_path,
// //         genres: movieApiData.genres,
// //         casts: movieCreditsData.cast,
// //         release_date: movieApiData.release_date,
// //         original_language: movieApiData.original_language,
// //         tagline: movieApiData.tagline || "",
// //         vote_average: movieApiData.vote_average,
// //         runtime: movieApiData.runtime,
// //       };

// //       //   Add movie to the database
// //       movie = await Movie.create(movieDetails);
// //     }

// //     const showsToCreate = [];
// //     showsInput.forEach((show) => {
// //       const showDate = show.date;
// //       show.time.forEach((time) => {
// //         const dateTimeString = `${showDate}T${time}`;
// //         showsToCreate.push({
// //           movie: movieId,
// //           showDateTime: new Date(dateTimeString),
// //           showPrice,
// //           occupiedSeats: {}, // Initialize with empty object
// //         });
// //       });
// //     });

// //     if (showsToCreate.length > 0) {
// //       await Show.insertMany(showsToCreate);
// //     }

// //     // Trigger Inngest event
// //     // await inngest.send({
// //     //   name: "app/show.added",
// //     //   data: { movieTitle: movie.title },
// //     // });

// //     res.json({ success: true, message: "Show Added successfully." });
// //   } catch (error) {
// //     console.error(error);
// //     res.json({ success: false, message: error.message });
// //   }
// // };

// // // API to get all shows from the database
// // export const getShows = async (req, res) => {
// //   try {
// //     const shows = await Show.find({ showDateTime: { $gte: new Date() } })
// //       .populate("movie")
// //       .sort({ showDateTime: 1 });

// //     // filter unique shows
// //     const uniqueShows = new Set(shows.map((show) => show.movie));

// //     res.json({ success: true, shows: Array.from(uniqueShows) });
// //   } catch (error) {
// //     console.error(error);
// //     res.json({ success: false, message: error.message });
// //   }
// // };

// // // API to get a single show from the database
// // export const getShow = async (req, res) => {
// //   try {
// //     const { movieId } = req.params;
// //     // get all upcoming shows for the movie
// //     const shows = await Show.find({
// //       movie: movieId,
// //       showDateTime: { $gte: new Date() },
// //     });

// //     const movie = await Movie.findById(movieId);
// //     const dateTime = {};

// //     shows.forEach((show) => {
// //       const date = show.showDateTime.toISOString().split("T")[0];
// //       if (!dateTime[date]) {
// //         dateTime[date] = [];
// //       }

// //       dateTime[date].push({ time: show.showDateTime, showId: show._id });
// //     });

// //     res.json({ success: true, movie, dateTime });
// //   } catch (error) {
// //     console.error(error);
// //     res.json({ success: false, message: error.message });
// //   }
// // };


// //these 2 lines added extra
// import process from "process";
// process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";

// import axios from "axios";
// import Movie from "../models/Movie.js";
// import Show from "../models/Show.js";
// import { inngest } from "../inngest/index.js";

// // API to get now playing movies from TMDB API
// // API to get now playing movies from TMDB API
// export const getNowPlayingMovies = async (req, res) => {
//   try {
//     /* CHANGED: Swapped Axios for Native Fetch to match your bulletproof addShow logic */
//     const response = await fetch("https://api.themoviedb.org/3/movie/now_playing", {
//       method: 'GET',
//       headers: {
//         'Authorization': `Bearer ${process.env.TMDB_API_KEY}`,
//         'Accept': 'application/json'
//       }
//     });

//     const data = await response.json();

//     if (!response.ok) {
//       throw new Error(`TMDB list fetch failed with status ${response.status}`);
//     }

//     const movies = data.results;
//     res.json({ success: true, movies: movies });
//   } catch (error) {
//     console.error("❌ NOW PLAYING LIST FETCH FAILED:", error.message);
//     res.json({ success: false, message: error.message });
//   }
// };

// // API to add a new show to the database
// // API to add a new show to the database
// export const addShow = async (req, res) => {
//   try {
//     const { movieId, showsInput, showPrice } = req.body;

//     console.log("================ NEW ADD SHOW REQUEST ================");
//     console.log("[STEP 1] Received data from Admin Frontend:");
//     console.log(" -> Movie ID:", movieId);
//     console.log(" -> Shows Input Array:", JSON.stringify(showsInput));
//     console.log(" -> Ticket Price:", showPrice);

//     console.log("[STEP 2] Checking if movie already exists in MongoDB...");
//     let movie = await Movie.findById(movieId);

//     if (!movie) {
//       console.log(" -> Movie NOT found in MongoDB. Initiating TMDB API calls...");
      
//       const controller = new AbortController();
//       const timeoutId = setTimeout(() => {
//         console.log(" [TIMEOUT ALERT] TMDB API took longer than 6 seconds. Aborting request!");
//         controller.abort();
//       }, 6000);

//       try {
//         console.log(` -> Fetching details for Movie ID ${movieId} from TMDB...`);
//         const detailsRes = await fetch(`https://api.themoviedb.org/3/movie/${movieId}`, {
//           method: 'GET',
//           headers: {
//             'Authorization': `Bearer ${process.env.TMDB_API_KEY}`,
//             'Accept': 'application/json'
//           },
//           signal: controller.signal
//         });
        
//         console.log(" -> TMDB Movie Details response received status:", detailsRes.status);
//         const movieApiData = await detailsRes.json();
        
//         if (!detailsRes.ok) {
//           console.error(" -> TMDB API Details Error Data:", movieApiData);
//           throw new Error(`TMDB Details failed with status ${detailsRes.status}`);
//         }

//         console.log(` -> Fetching credits/cast for Movie ID ${movieId} from TMDB...`);
//         const creditsRes = await fetch(`https://api.themoviedb.org/3/movie/${movieId}/credits`, {
//           method: 'GET',
//           headers: {
//             'Authorization': `Bearer ${process.env.TMDB_API_KEY}`,
//             'Accept': 'application/json'
//           },
//           signal: controller.signal
//         });
        
//         console.log(" -> TMDB Movie Credits response received status:", creditsRes.status);
//         const movieCreditsData = await creditsRes.json();

//         if (!creditsRes.ok) {
//           console.error(" -> TMDB API Credits Error Data:", movieCreditsData);
//           throw new Error(`TMDB Credits failed with status ${creditsRes.status}`);
//         }

//         clearTimeout(timeoutId);
//         console.log(" -> Successfully retrieved all data from TMDB for:", movieApiData.title);

//         const movieDetails = {
//           _id: movieId,
//           title: movieApiData.title,
//           overview: movieApiData.overview,
//           poster_path: movieApiData.poster_path,
//           backdrop_path: movieApiData.backdrop_path,
//           genres: movieApiData.genres,
//           casts: movieCreditsData.cast,
//           release_date: movieApiData.release_date,
//           original_language: movieApiData.original_language,
//           tagline: movieApiData.tagline || "",
//           vote_average: movieApiData.vote_average,
//           runtime: movieApiData.runtime,
//         };

//         console.log("[STEP 3] Saving new movie into MongoDB Cluster...");
//         movie = await Movie.create(movieDetails);
//         console.log(" -> Movie created successfully in database!");

//       } catch (fetchError) {
//         clearTimeout(timeoutId);
//         console.error("❌ CRITICAL ERROR DURING TMDB FETCH OR MONGO SAVE:", fetchError.message);
//         throw fetchError; 
//       }
//     } else {
//       console.log(" -> Movie already exists in MongoDB! Skipping TMDB API lookups.");
//     }

//     console.log("[STEP 4] Parsing showtimes array input...");
//     const showsToCreate = [];
//     showsInput.forEach((show, index) => {
//       const showDate = show.date;
//       show.time.forEach((time) => {
//         const dateTimeString = `${showDate}T${time}`;
//         console.log(` -> Formatting showtime slot [${index}]: ${dateTimeString}`);
//         showsToCreate.push({
//           movie: movieId,
//           showDateTime: new Date(dateTimeString),
//           showPrice,
//           occupiedSeats: {}, 
//         });
//       });
//     });

//     if (showsToCreate.length > 0) {
//       console.log(`[STEP 5] Inserting ${showsToCreate.length} showtimes into MongoDB...`);
//       await Show.insertMany(showsToCreate);
//       console.log(" -> Show documents saved successfully!");
//     } else {
//       console.log(" -> WARNING: No showtimes were detected to insert.");
//     }

//     console.log("================ REQUEST COMPLETED SUCCESSFULLY ================");
//     res.json({ success: true, message: "Show Added successfully." });

//   } catch (error) {
//     console.error("=================== REQUEST FAILED ===================");
//     console.error("Error Message:", error.message);
//     if (error.cause) console.error("System Core Cause:", error.cause);
//     console.error("======================================================");
//     res.json({ success: false, message: error.message });
//   }
// };

// // API to get all shows from the database
// export const getShows = async (req, res) => {
//   try {
//     const shows = await Show.find({ showDateTime: { $gte: new Date() } })
//       .populate("movie")
//       .sort({ showDateTime: 1 });

//     // filter unique shows
//     const uniqueShows = new Set(shows.map((show) => show.movie));

//     res.json({ success: true, shows: Array.from(uniqueShows) });
//   } catch (error) {
//     console.error(error);
//     res.json({ success: false, message: error.message });
//   }
// };

// // API to get a single show from the database
// export const getShow = async (req, res) => {
//   try {
//     const { movieId } = req.params;
//     // get all upcoming shows for the movie
//     const shows = await Show.find({
//       movie: movieId,
//       showDateTime: { $gte: new Date() },
//     });

//     const movie = await Movie.findById(movieId);
//     const dateTime = {};

//     shows.forEach((show) => {
//       const date = show.showDateTime.toISOString().split("T")[0];
//       if (!dateTime[date]) {
//         dateTime[date] = [];
//       }

//       dateTime[date].push({ time: show.showDateTime, showId: show._id });
//     });

//     res.json({ success: true, movie, dateTime });
//   } catch (error) {
//     console.error(error);
//     res.json({ success: false, message: error.message });
//   }
// };

// import process from "process";
// process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0"; // Forces Windows network adapters to unblock outgoing API requests

// import Movie from "../models/Movie.js";
// import Show from "../models/Show.js";
// import { inngest } from "../inngest/index.js";

// // API to get now playing movies from TMDB API
// export const getNowPlayingMovies = async (req, res) => {
//   try {
//     console.log("[LIST SERVICE] Fetching now playing movies array from TMDB...");
//     const response = await fetch("https://api.themoviedb.org/3/movie/now_playing", {
//       method: 'GET',
//       headers: {
//         'Authorization': `Bearer ${process.env.TMDB_API_KEY}`,
//         'Accept': 'application/json'
//       }
//     });

//     const data = await response.json();

//     if (!response.ok) {
//       throw new Error(`TMDB list fetch failed with status ${response.status}`);
//     }

//     const movies = data.results;
//     console.log(` -> Successfully fetched ${movies.length} movies for dropdown array.`);
//     res.json({ success: true, movies: movies });
//   } catch (error) {
//     console.error("❌ NOW PLAYING LIST FETCH FAILED:", error.message);
//     res.json({ success: false, message: error.message });
//   }
// };

// // API to add a new show to the database
// export const addShow = async (req, res) => {
//   try {
//     const { movieId, showsInput, showPrice } = req.body;

//     console.log("================ NEW ADD SHOW REQUEST ================");
//     console.log("[STEP 1] Received data from Admin Frontend:");
//     console.log(" -> Movie ID:", movieId);
//     console.log(" -> Shows Input Array:", JSON.stringify(showsInput));
//     console.log(" -> Ticket Price:", showPrice);

//     console.log("[STEP 2] Checking if movie already exists in MongoDB...");
//     let movie = await Movie.findById(movieId);

//     if (!movie) {
//       console.log(" -> Movie NOT found in MongoDB. Initiating TMDB API calls...");
      
//       const controller = new AbortController();
//       const timeoutId = setTimeout(() => {
//         console.log(" [TIMEOUT ALERT] TMDB API took longer than 6 seconds. Aborting request!");
//         controller.abort();
//       }, 6000);

//       try {
//         console.log(` -> Fetching details for Movie ID ${movieId} from TMDB...`);
//         const detailsRes = await fetch(`https://api.themoviedb.org/3/movie/${movieId}`, {
//           method: 'GET',
//           headers: {
//             'Authorization': `Bearer ${process.env.TMDB_API_KEY}`,
//             'Accept': 'application/json'
//           },
//           signal: controller.signal
//         });
        
//         console.log(" -> TMDB Movie Details response received status:", detailsRes.status);
//         const movieApiData = await detailsRes.json();
        
//         if (!detailsRes.ok) {
//           console.error(" -> TMDB API Details Error Data:", movieApiData);
//           throw new Error(`TMDB Details failed with status ${detailsRes.status}`);
//         }

//         console.log(` -> Fetching credits/cast for Movie ID ${movieId} from TMDB...`);
//         const creditsRes = await fetch(`https://api.themoviedb.org/3/movie/${movieId}/credits`, {
//           method: 'GET',
//           headers: {
//             'Authorization': `Bearer ${process.env.TMDB_API_KEY}`,
//             'Accept': 'application/json'
//           },
//           signal: controller.signal
//         });
        
//         console.log(" -> TMDB Movie Credits response received status:", creditsRes.status);
//         const movieCreditsData = await creditsRes.json();

//         if (!creditsRes.ok) {
//           console.error(" -> TMDB API Credits Error Data:", movieCreditsData);
//           throw new Error(`TMDB Credits failed with status ${creditsRes.status}`);
//         }

//         clearTimeout(timeoutId);
//         console.log(" -> Successfully retrieved all data from TMDB for:", movieApiData.title);

//         const movieDetails = {
//           _id: movieId,
//           title: movieApiData.title,
//           overview: movieApiData.overview,
//           poster_path: movieApiData.poster_path,
//           backdrop_path: movieApiData.backdrop_path,
//           genres: movieApiData.genres,
//           casts: movieCreditsData.cast,
//           release_date: movieApiData.release_date,
//           original_language: movieApiData.original_language,
//           tagline: movieApiData.tagline || "",
//           vote_average: movieApiData.vote_average,
//           runtime: movieApiData.runtime,
//         };

//         console.log("[STEP 3] Saving new movie into MongoDB Cluster...");
//         movie = await Movie.create(movieDetails);
//         console.log(" -> Movie created successfully in database!");

//       } catch (fetchError) {
//         clearTimeout(timeoutId);
//         console.error("❌ CRITICAL ERROR DURING TMDB FETCH OR MONGO SAVE:", fetchError.message);
//         throw fetchError; 
//       }
//     } else {
//       console.log(" -> Movie already exists in MongoDB! Skipping TMDB API lookups.");
//     }

//     console.log("[STEP 4] Parsing showtimes array input...");
//     const showsToCreate = [];
//     showsInput.forEach((show, index) => {
//       const showDate = show.date;
//       show.time.forEach((time) => {
//         const dateTimeString = `${showDate}T${time}`;
//         console.log(` -> Formatting showtime slot [${index}]: ${dateTimeString}`);
//         showsToCreate.push({
//           movie: movieId,
//           showDateTime: new Date(dateTimeString),
//           showPrice,
//           occupiedSeats: {}, 
//         });
//       });
//     });

//     if (showsToCreate.length > 0) {
//       console.log(`[STEP 5] Inserting ${showsToCreate.length} showtimes into MongoDB...`);
//       await Show.insertMany(showsToCreate);
//       console.log(" -> Show documents saved successfully!");
//     } else {
//       console.log(" -> WARNING: No showtimes were detected to insert.");
//     }

//     console.log("================ REQUEST COMPLETED SUCCESSFULLY ================");
//     res.json({ success: true, message: "Show Added successfully." });

//   } catch (error) {
//     console.error("=================== REQUEST FAILED ===================");
//     console.error("Error Message:", error.message);
//     if (error.cause) console.error("System Core Cause:", error.cause);
//     console.error("======================================================");
//     res.json({ success: false, message: error.message });
//   }
// };

// // API to get all shows from the database
// export const getShows = async (req, res) => {
//   try {
//     const shows = await Show.find({ showDateTime: { $gte: new Date() } })
//       .populate("movie")
//       .sort({ showDateTime: 1 });

//     const uniqueShows = new Set(shows.map((show) => show.movie));
//     res.json({ success: true, shows: Array.from(uniqueShows) });
//   } catch (error) {
//     console.error(error);
//     res.json({ success: false, message: error.message });
//   }
// };

// // API to get a single show from the database
// export const getShow = async (req, res) => {
//   try {
//     const { movieId } = req.params;
//     const shows = await Show.find({
//       movie: movieId,
//       showDateTime: { $gte: new Date() },
//     });

//     const movie = await Movie.findById(movieId);
//     const dateTime = {};

//     shows.forEach((show) => {
//       const date = show.showDateTime.toISOString().split("T")[0];
//       if (!dateTime[date]) {
//         dateTime[date] = [];
//       }
//       dateTime[date].push({ time: show.showDateTime, showId: show._id });
//     });

//     res.json({ success: true, movie, dateTime });
//   } catch (error) {
//     console.error(error);
//     res.json({ success: false, message: error.message });
//   }
// };

import process from "process";
// Forces Windows network adapters to bypass certificate verification layer checkpoints that cause socket resets (ECONNRESET)
process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0"; 

import Movie from "../models/Movie.js";
import Show from "../models/Show.js";
import { inngest } from "../inngest/index.js";

/**
 * Robust Network Resiliency Helper Function
 * Automatically attempts to re-establish dropped data socket streams on unstable connections
 */
const fetchWithRetry = async (url, options, retries = 3, delay = 1000) => {
  for (let i = 0; i < retries; i++) {
    try {
      const res = await fetch(url, options);
      if (res.ok) return res;
      // If TMDB actively responds with a client-side warning (e.g., 404), bubble it up immediately
      if (res.status >= 400 && res.status < 500) return res; 
    } catch (err) {
      if (i === retries - 1) throw err; // Exhausted all retries, surface the error
      console.log(`[NETWORK AUTORETRY] Packet stream interrupted by local router. Retrying request in ${delay}ms... (Attempt ${i + 1}/${retries})`);
      await new Promise(res => setTimeout(res, delay));
    }
  }
};

// API to get now playing movies from TMDB API
export const getNowPlayingMovies = async (req, res) => {
  try {
    console.log("[LIST SERVICE] Fetching now playing movies array from TMDB...");
    const response = await fetchWithRetry("https://api.themoviedb.org/3/movie/now_playing", {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${process.env.TMDB_API_KEY}`,
        'Accept': 'application/json'
      }
    });

    const data = await response.json();
    const movies = data.results;
    console.log(` -> Successfully fetched ${movies.length} movies for dropdown array.`);
    res.json({ success: true, movies: movies });
  } catch (error) {
    console.error("❌ NOW PLAYING LIST FETCH FAILED:", error.message);
    res.json({ success: false, message: error.message });
  }
};

// API to add a new show to the database
export const addShow = async (req, res) => {
  try {
    const { movieId, showsInput, showPrice } = req.body;

    console.log("================ NEW ADD SHOW REQUEST ================");
    console.log("[STEP 1] Received data from Admin Frontend for Movie ID:", movieId);

    console.log("[STEP 2] Checking if movie already exists in MongoDB...");
    let movie = await Movie.findById(movieId);

    if (!movie) {
      console.log(" -> Movie NOT found in MongoDB. Initiating sequential TMDB API calls...");
      
      try {
        console.log(` -> Fetching details for Movie ID ${movieId} from TMDB...`);
        const detailsRes = await fetchWithRetry(`https://api.themoviedb.org/3/movie/${movieId}`, {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${process.env.TMDB_API_KEY}`,
            'Accept': 'application/json'
          }
        });
        
        const movieApiData = await detailsRes.json();
        
        if (!detailsRes.ok) {
          throw new Error(`TMDB Details failed with status ${detailsRes.status}`);
        }

        console.log(` -> Fetching credits/cast for Movie ID ${movieId} from TMDB...`);
        const creditsRes = await fetchWithRetry(`https://api.themoviedb.org/3/movie/${movieId}/credits`, {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${process.env.TMDB_API_KEY}`,
            'Accept': 'application/json'
          }
        });
        
        const movieCreditsData = await creditsRes.json();

        if (!creditsRes.ok) {
          throw new Error(`TMDB Credits failed with status ${creditsRes.status}`);
        }

        console.log(" -> Successfully retrieved all data from TMDB for:", movieApiData.title);

        const movieDetails = {
          _id: movieId,
          title: movieApiData.title,
          overview: movieApiData.overview,
          poster_path: movieApiData.poster_path,
          backdrop_path: movieApiData.backdrop_path,
          genres: movieApiData.genres,
          casts: movieCreditsData.cast,
          release_date: movieApiData.release_date,
          original_language: movieApiData.original_language,
          tagline: movieApiData.tagline || "",
          vote_average: movieApiData.vote_average,
          runtime: movieApiData.runtime,
        };

        console.log("[STEP 3] Saving new movie into MongoDB Cluster...");
        movie = await Movie.create(movieDetails);
        console.log(" -> Movie created successfully in database!");

      } catch (fetchError) {
        console.error("❌ CRITICAL ERROR DURING TMDB FETCH OR MONGO SAVE:", fetchError.message);
        throw fetchError; 
      }
    } else {
      console.log(" -> Movie already exists in MongoDB! Skipping TMDB API lookups.");
    }

    console.log("[STEP 4] Parsing showtimes array input...");
    const showsToCreate = [];
    showsInput.forEach((show) => {
      const showDate = show.date;
      show.time.forEach((time) => {
        const dateTimeString = `${showDate}T${time}`;
        showsToCreate.push({
          movie: movieId,
          showDateTime: new Date(dateTimeString),
          showPrice,
          occupiedSeats: {}, 
        });
      });
    });

    if (showsToCreate.length > 0) {
      console.log(`[STEP 5] Inserting ${showsToCreate.length} showtimes into MongoDB...`);
      await Show.insertMany(showsToCreate);
      console.log(" -> Show documents saved successfully!");
    }

    console.log("================ REQUEST COMPLETED SUCCESSFULLY ================");
    res.json({ success: true, message: "Show Added successfully." });

  } catch (error) {
    console.error("=================== REQUEST FAILED ===================");
    console.error("Error Message:", error.message);
    console.error("======================================================");
    res.json({ success: false, message: error.message });
  }
};

// API to get all shows from the database
export const getShows = async (req, res) => {
  try {
    const shows = await Show.find({ showDateTime: { $gte: new Date() } })
      .populate("movie")
      .sort({ showDateTime: 1 });

    const uniqueShows = new Set(shows.map((show) => show.movie));
    res.json({ success: true, shows: Array.from(uniqueShows) });
  } catch (error) {
    console.error(error);
    res.json({ success: false, message: error.message });
  }
};

// API to get a single show from the database
export const getShow = async (req, res) => {
  try {
    const { movieId } = req.params;
    const shows = await Show.find({
      movie: movieId,
      showDateTime: { $gte: new Date() },
    });

    const movie = await Movie.findById(movieId);
    const dateTime = {};

    shows.forEach((show) => {
      const date = show.showDateTime.toISOString().split("T")[0];
      if (!dateTime[date]) {
        dateTime[date] = [];
      }
      dateTime[date].push({ time: show.showDateTime, showId: show._id });
    });

    res.json({ success: true, movie, dateTime });
  } catch (error) {
    console.error(error);
    res.json({ success: false, message: error.message });
  }
};