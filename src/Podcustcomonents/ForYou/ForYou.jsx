import React from 'react';
import './ForYou.css';

const ForYou = () => {
  const recommendations = [
    { id: 1, title: 'All the Code', image: 'https://s3-alpha-sig.figma.com/img/4a66/1431/a54377019e07d640117be48aa2e44d12?Expires=1740960000&Key-Pair-Id=APKAQ4GOSFWCW27IBOMQ&Signature=jsyptqaCaU1AzK-AvGMKbMEQh-u01T9gaR0NYPn-j7FDX519bOnCJxK7TrRhJlgyFep0RyEjh2aMIuGIqJsHW6RwXP-Q0U0f0I1~kp05YyP~nlBVQKkRDGUrjWDraUkzbM-P3cgs6GBiEx4scww7mEtRsc9ArA0mbk8Hr7n2cPd5nXua3kJNBFG~UsYgOYKA6CMigguM-uLeJiGs0Z5nHLL49ApmCAqoS3Mb4FqoY4Inbu1r3Q4hZqOJ1qfkRXUW1hXIGxg9-OiNsQEpbiwaglPymqROkUVyNYi0NV7h3qlYY-D7Ij8CQ3d~nsIeWs70lnfCa8f2fumIN~wv8cFYyQ__' },
    { id: 2, title:'Code and the Coding Coders who Code it', image:'https://s3-alpha-sig.figma.com/img/2364/77fe/c5684ff5c36e5890f7333a0f694809f9?Expires=1740960000&Key-Pair-Id=APKAQ4GOSFWCW27IBOMQ&Signature=eJKE1q-ghgxreAEvC9incvhEgnnrPn0b~YMLti3JIsvXS1JCEjhmqdZs6AtjRF2WA87PB~crHfLIOXZpNxc~Il9ad5oc0QaMUNGQEOCrOGcDXUctRHMwYOsp1xzf6JwcNvTovpScpVctqSVeVwb78BOkp-gaf8ekb7WTiXVZX0AAKUeyW3DHN849jiScjVOFIqtN2Ux39qdfCiG3uZMNAhG449FjgVXZIZ3Q4N5WZ4J~hebslq2~5IIHCHT893P4TQteEJVQzpwF~csRtKHxGcCJK2TnU3N1yfi782U495E3RYcAIh0Ip~RXwE-~l~46p0ASWIiuL2ATrRtXI1KaFQ__' },
    { id: 3, title: 'Data Science at Home', image: 'https://s3-alpha-sig.figma.com/img/69ce/e804/9f9b0b428e5408241dab8a8e34007042?Expires=1740960000&Key-Pair-Id=APKAQ4GOSFWCW27IBOMQ&Signature=KZMsclVvrk9pxaW6Sgq7uad286clkezFqjCgFCpp8CQFi4s21YQ9P1Wretcjp-6D8Ielh07Yl74xI82I4NsB~DbhYaNaBDxmo5Tj46YmHCUpyucDOPmlOTeXs4Ty~kVC31B5J7I7WJXfT4VBZsGwGe8e96T15jCUJaQEtr2gQiXHRxprBdPwuyjbxTsR2UZ142u~uLnhjYmI74JnwsRm-m-i5ruTompD7VhQz3bjfvHuEJDrXxzEN8-dAJRFL~ewdEgYtyzLS2JIpwrIc-CfGIHyFTcu0nUFmoNcasLBijuZfV00jKkyc9ewWWas18wD8jTpV0B7TxQevjUwXbDVEQ__' },
    { id: 4, title: 'Developing Leadership', image: 'https://s3-alpha-sig.figma.com/img/a6a7/593b/9cc151fde21614196383eeca85180368?Expires=1740960000&Key-Pair-Id=APKAQ4GOSFWCW27IBOMQ&Signature=NCVI2bZP25jFt8GLp9MSnicslJByYOL-H-OqyYkToo5kARwBXmjWa3JavjtSrhjsz4hb27vRmQKTDuh5pVnJ7~UfJ56dnwcSInuL1omGpbYhTrL6qCY1s4H5CFVjE4olp6AK-GDPS71bpPxA1eFzZ3ln1VVZnfmKNRxcdPhSWWJdPyJCrW-5PROpd6f9xLZyUVHDPmfF5BtXLRsrWndLyE1mqKUQwFnaXeoNYBSbn-WIuIZv8xVdUzpg6Utv4Ex~3AaO3-zN6AoKcW92f0x7wf2j14~BpcBUxQhASchz6nEh36pgPsDyNl6Q0WE-XOBDIUqfmITPzF2gKiMfL0tp0A__' },
  ];

  return (
    <div className="for-you">
      <h3>For You</h3>
      <ul>
        {recommendations.map((item) => (
          <li key={item.id} className="for-you-item">
            <img src={item.image} alt={item.title} />
            <span>{item.title}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ForYou;
