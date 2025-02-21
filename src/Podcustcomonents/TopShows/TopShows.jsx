import React from 'react';
import './TopShows.css';

const TopShows = () => {
  const shows = [
    { id: 1, title: 'Code Story', image: 'https://s3-alpha-sig.figma.com/img/1844/c266/8c4c34bca9366caa744196c967e9e478?Expires=1740960000&Key-Pair-Id=APKAQ4GOSFWCW27IBOMQ&Signature=iunF8CpnCbx2Hw93GVwdEYwzyzCaa5aGwalj1D97fKopyj09gvnl6xe5tMbMZClPm1rsa3bb66yhRi9JOfjXMtsW96SDYL8~gZj2gKYK9Ts8TrmyeCXLCupgzYHje2TkCVly5nZlv~g0LFW2gZLoV9FKpB34oL8zKma~JfTE1H83X30iQkYmvHLS4YM96b7HM5ZFHze-yMAbf~x-LHmzaRWGcXQLAPNyf8wDNV9jJthj2GOxkYiJK5lK8Z3bq7x088kFiGQXJIhcJq8tm7Ve-GkIEG6Hz3DCyp8W9foURiF71Fwf~bkRUKgTYJh0MbtFJyMf95LkYZ9IOwva-caMGA__' },
    { id: 2, title: 'React Podcast', image: 'https://s3-alpha-sig.figma.com/img/8f7f/86ca/a54ac1a256342fce8c8b506b1c58943d?Expires=1740960000&Key-Pair-Id=APKAQ4GOSFWCW27IBOMQ&Signature=B4ITK6uan0blc9NOKb1rhEf57LH1jsKM96wQqdfWV0gKS12v84AZLPjHZU8Fu6Mq67xUJgw4w2YZe3KR1I3xA41eccgR5v3PF-w8YJL5yufLBQzU3dTHRewPjbETbS8gxde0AFrvuUsD7ds8d56YNuB9KHtbve4CIB62~Oz83N14apmubA~bi0poLJq65jscEO32IQGvLKrBcUKT~bUryhKTT7sPHPR-nz6dMb7tS-s~A0d-iYJPRV2-FRrmcXpA7yiWIBE4ShABfnrNz8r4yjI4tEU4vDSsCO-daAy0d2GgoVGrLQzXUmFpI1Z6OjW~rbL5Fx4n-zK9zIZ8UzNJew__' },
    { id: 3, title: 'JS Party', image: 'https://s3-alpha-sig.figma.com/img/604e/ddcc/5970a095c10f7b950fc69d41cad98b56?Expires=1740960000&Key-Pair-Id=APKAQ4GOSFWCW27IBOMQ&Signature=f5BWVsutm8-6-eF9PqcC6GOjFuG6HL4c8vjR1C5lU3QlVaGpfae69vz9JKaMVwr~JomV3sQazHGSQcRLC9qa2qiPsw~oFvR7VUZblZ5qkMxMV9CQRHHU3Nw8GPIZDC3BMXt6gWx-9MhQpJdGkkVdUcuiy2nk6YTDtj4lvFoZe70mStR7xtqzQiaG9W-flKiI-nSWsgn525OkFbY3cadc2KM~veAa1yARDzTPUHXdMCG4n-mb8arPe~LeEBU~V7XYpJ9RxDUMVNKBXW-AVi-cavV6q-h5VSCmh53Cf85JSlXxKtcXNtB2NbRUiFGCBnTJaMvNEVi9JdFeTSXeFiIJYA__' },
  ];

  return (
    <div className="top-shows">
      <h3>Top Shows</h3>
      <div className="shows-container">
        {shows.map((show) => (
          <div key={show.id} className="show-card">
            <img src={show.image} alt={show.title} />
            <p>{show.title}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TopShows;
