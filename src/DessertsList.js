function DessertsList(props) {
    const data = props.data;

    const displayData = data.filter((d) => d.calories > 200).sort((a,b) => a.calories - b.calories)
      .map((d) => {
        const item = `${d.name} - ${d.calories}`
        return <li>{item} cal</li>
      })
    displayData.sort();
    console.log(data);
    // Implement the component here.
    return (
      <ul>
        {displayData}
      </ul>
    );
  }
  
  export default DessertsList;
  