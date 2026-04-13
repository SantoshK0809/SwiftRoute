// import React, { useContext } from 'react'
// import { CaptainDataContext } from '../context/CapatainContext'

// const CaptainDetails = () => {

//     const { captain } = useContext(CaptainDataContext)

//     return (
//         <div>
//             <div className='flex items-center justify-between'>
//                 <div className='flex items-center justify-start gap-3'>
//                     <img className='h-10 w-10 rounded-full object-cover' src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRdlMd7stpWUCmjpfRjUsQ72xSWikidbgaI1w&s" alt="" />
//                     <h4 className='text-lg font-medium capitalize'>{captain.fullname.firstname + " " + captain.fullname.lastname}</h4>
//                 </div>
//                 <div>
//                     <h4 className='text-xl font-semibold'>₹295.20</h4>
//                     <p className='text-sm text-gray-600'>Earned</p>
//                 </div>
//             </div>
//             <div className='flex p-3 mt-8 bg-gray-100 rounded-xl justify-center gap-5 items-start'>
//                 <div className='text-center'>
//                     <i className="text-3xl mb-2 font-thin ri-timer-2-line"></i>
//                     <h5 className='text-lg font-medium'>10.2</h5>
//                     <p className='text-sm text-gray-600'>Hours Online</p>
//                 </div>
//                 <div className='text-center'>
//                     <i className="text-3xl mb-2 font-thin ri-speed-up-line"></i>
//                     <h5 className='text-lg font-medium'>10.2</h5>
//                     <p className='text-sm text-gray-600'>Hours Online</p>
//                 </div>
//                 <div className='text-center'>
//                     <i className="text-3xl mb-2 font-thin ri-booklet-line"></i>
//                     <h5 className='text-lg font-medium'>10.2</h5>
//                     <p className='text-sm text-gray-600'>Hours Online</p>
//                 </div>

//             </div>
//         </div>
//     )
// }

// export default CaptainDetails

// import React from "react";
// import { Clock, Gauge, BookOpen, Navigation } from "lucide-react";

// const CaptainDetails = () => {
//   return (
//     <div className="space-y-6">
//       {/* Captain Info & Earnings */}
//       <div className="flex items-center justify-between">
//         <div className="flex items-center gap-3">
//           <div className="h-12 w-12 rounded-full bg-secondary border-2 border-primary/30 flex items-center justify-center overflow-hidden">
//             <img
//               className="h-full w-full object-cover"
//               src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRdlMd7stpWUCmjpfRjUsQ72xSWikidbgaI1w&s"
//               alt="Captain"
//             />
//           </div>
//           <div>
//             <h4 className="text-base font-semibold text-foreground">
//               John Doe
//             </h4>
//             <p className="text-xs text-muted-foreground">Gold Captain</p>
//           </div>
//         </div>
//         <div className="text-right">
//           <h4 className="text-xl font-bold text-gradient">₹295.20</h4>
//           <p className="text-xs text-muted-foreground">Today's Earnings</p>
//         </div>
//       </div>

//       {/* Stats Cards */}
//       <div className="grid grid-cols-3 gap-3">
//         <div className="glass rounded-xl p-3 text-center">
//           <div className="mx-auto mb-2 h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center">
//             <Clock className="h-5 w-5 text-primary" />
//           </div>
//           <h5 className="text-lg font-semibold text-foreground">10.2</h5>
//           <p className="text-xs text-muted-foreground">Hours Online</p>
//         </div>
//         <div className="glass rounded-xl p-3 text-center">
//           <div className="mx-auto mb-2 h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center">
//             <Gauge className="h-5 w-5 text-primary" />
//           </div>
//           <h5 className="text-lg font-semibold text-foreground">30.5</h5>
//           <p className="text-xs text-muted-foreground">KM Driven</p>
//         </div>
//         <div className="glass rounded-xl p-3 text-center">
//           <div className="mx-auto mb-2 h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center">
//             <BookOpen className="h-5 w-5 text-primary" />
//           </div>
//           <h5 className="text-lg font-semibold text-foreground">8</h5>
//           <p className="text-xs text-muted-foreground">Trips Done</p>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default CaptainDetails;

import React from "react";
import { Clock, Gauge, BookOpen } from "lucide-react";

const CaptainDetails = () => {
  return (
    <div className="space-y-5 text-white">
      {/* HEADER CARD */}
      <div
        className="flex items-center justify-between p-4 rounded-2xl 
                      bg-white/10 backdrop-blur-md border border-white/10 shadow-sm"
      >
        {/* LEFT */}
        <div className="flex items-center gap-3">
          <div className="h-12 w-12 rounded-full border border-white/20 overflow-hidden">
            <img
              className="h-full w-full object-cover"
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRdlMd7stpWUCmjpfRjUsQ72xSWikidbgaI1w&s"
              alt="Captain"
            />
          </div>

          <div>
            <h4 className="text-sm text-gray-600 font-semibold">John Doe</h4>
            <p className="text-xs text-gray-400">Gold Captain</p>
          </div>
        </div>

        {/* RIGHT (EARNINGS) */}
        <div className="text-right">
          <h4 className="text-2xl font-bold text-blue-400">₹295.20</h4>
          <p className="text-xs text-gray-400">Today's Earnings</p>
        </div>
      </div>

      {/* STATS */}
      <div className="grid grid-cols-3 gap-3">
        {/* CARD 1 */}
        <div className="rounded-xl p-3 text-center bg-white/5 border border-white/10 hover:bg-white/10 transition">
          <div className="mx-auto mb-2 h-10 w-10 rounded-lg bg-blue-500/10 flex items-center justify-center">
            <Clock className="h-5 w-5 text-blue-400" />
          </div>
          <h5 className="text-lg text-gray-600 font-semibold">10.2</h5>
          <p className="text-xs text-gray-400">Hours Online</p>
        </div>

        {/* CARD 2 */}
        <div className="rounded-xl p-3 text-center bg-white/5 border border-white/10 hover:bg-white/10 transition">
          <div className="mx-auto mb-2 h-10 w-10 rounded-lg bg-blue-500/10 flex items-center justify-center">
            <Gauge className="h-5 w-5 text-blue-400" />
          </div>
          <h5 className="text-lg text-gray-600 font-semibold">30.5</h5>
          <p className="text-xs text-gray-400">KM Driven</p>
        </div>

        {/* CARD 3 */}
        <div className="rounded-xl p-3 text-center bg-white/5 border border-white/10 hover:bg-white/10 transition">
          <div className="mx-auto mb-2 h-10 w-10 rounded-lg bg-blue-500/10 flex items-center justify-center">
            <BookOpen className="h-5 w-5 text-blue-400" />
          </div>
          <h5 className="text-lg text-gray-600 font-semibold">8</h5>
          <p className="text-xs text-gray-400">Trips Done</p>
        </div>
      </div>
    </div>
  );
};

export default CaptainDetails;
