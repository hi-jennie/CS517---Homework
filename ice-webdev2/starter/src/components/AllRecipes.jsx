import { useEffect, useState } from "react";
import Recipe from "./Recipe";

import Stopwatch from "../utils/Stopwatch";


Stopwatch.start();

export default function AllRecipes(props) {

    // it's better to assign a default value to the state variable
    const [recipes, setRecipes] = useState([]);

    useEffect(() => {
        fetch("https://cs571.org/rest/f24/ice/all-recipes",{
            headers: {
                "X-CS571-ID": "bid_6fdf3569a0589bf7a2ad2e4065b73b940a57be11eaf482cbc41b9c16c9fc7e75"
            }
        })
        .then(res => res.json())
        .then(data =>{
            setRecipes(data) // recommended
            // for(let d of data){
            //     setRecipes(recipes => [...recipes, d])
            // }
            // •	异步性：当调用 setState 时，React 并不会马上更新 state。而是将多个状态更新请求暂存到一个队列中，并在一次批量更新周期内处理它们。直到 React 完成整个渲染和 DOM 更新周期后，state 才会变成最新的值。
            // 就当前情况下，recipes还是会拿到所有data，但是会导致多次渲染，不推荐，性能问题


            // 以下主要是指
            // const handleClick = () => {
            //     setCount(count + 1);
            //     setCount(count + 2); // 三次状态更新会被合并
            //     setCount(count + 3);
            //   };
            // •	批量处理：为了性能优化，React 会将多次状态更新合并成一次。如果连续调用多次 setState，React 不会每次调用后立即触发重新渲染，而是在当前事件循环完成后，批量执行这些更新。
            // •	setRecipes(recipes => [...recipes, d]) 是基于旧的状态值 执行的。如果循环中更新的时候其他地方也在更新recipes，就可能会导致循环中拿到的recipes出现冲突
            // •	如果 React 尚未处理上一次状态更新，recipes 的值可能不是最新的，导致某些元素被覆盖或丢失。
            
        })

    })
    return <div>
        <h1>Welcome to Badger Recipes!</h1>
        {recipes.map(re => <Recipe key={re.name}  {...re}/>)}
    </div>


    // Is there a better way to do this? We'll explore this today!
    // const [pizza, setPizza] = useState();
    // const [pasta, setPasta] = useState();
    // const [chili, setChili] = useState();


    // this is really helpful to understanding the lifecycle of a component

    // useEffect(() => {

    //     // Which fetch will complete first? No one knows!

    //     fetch("https://cs571.org/rest/f24/ice/pizza", {
    //         headers: {
    //              "X-CS571-ID": "bid_6fdf3569a0589bf7a2ad2e4065b73b940a57be11eaf482cbc41b9c16c9fc7e75"
    //         }
    //     })
    //     .then(res => res.json())
    //     .then(data => {
    //         setPizza(data);
    //         console.log(data);
    //         console.log(Stopwatch.get(), "Received pizza; remember, it will not be set quite yet!", pizza);
    //     })

    //     fetch("https://cs571.org/rest/f24/ice/pasta", {
    //         headers: {
    //              "X-CS571-ID": "bid_6fdf3569a0589bf7a2ad2e4065b73b940a57be11eaf482cbc41b9c16c9fc7e75"
    //         }
    //     })
    //     .then(res => res.json())
    //     .then(data => {
    //         setPasta(data);
    //         console.log(Stopwatch.get(), "Received pasta; remember, it will not be set quite yet!", pasta);
    //     })

    //     fetch("https://cs571.org/rest/f24/ice/chili", {
    //         headers: {
    //              "X-CS571-ID": "bid_6fdf3569a0589bf7a2ad2e4065b73b940a57be11eaf482cbc41b9c16c9fc7e75"
    //         }
    //     })
    //     .then(res => res.json())
    //     .then(data => {
    //         setChili(data);
    //         console.log(Stopwatch.get(), "Received chili; remember, it will not be set quite yet!", chili);
    //     })

    //     console.log(Stopwatch.get(), "The AllRecipes component has mounted.")

    //     return () => {
    //         console.log(Stopwatch.get(), "The AllRecipes component has unmounted.")
    //     }
    // }, []);

    // useEffect(() => {
    //     console.log(Stopwatch.get(), "Now, pizza has been set.", pizza)
    // }, [pizza]);

    // useEffect(() => {
    //     console.log(Stopwatch.get(), "Now, pasta has been set.", pasta)
    // }, [pasta]);

    // useEffect(() => {
    //     console.log(Stopwatch.get(), "Now, chili has been set.", chili)
    // }, [chili]);

    // useEffect(() => {
    //     console.log(Stopwatch.get(), "Now, something has changed in AllRecipes!")
    // }, [chili, pizza, pasta]);

    // useEffect(() => {
    //     if (chili && pizza && pasta) {
    //         console.log(Stopwatch.get(), "Now, everything has been set in AllRecipes!")
    //     }
    // }, [chili, pizza, pasta]);

    // console.log(Stopwatch.get(), "AllRecipes is rendering!")

    // return <div>
    //     <h1>Welcome to Badger Recipes!</h1>
    //     <Recipe {...pizza}/>
    //     <Recipe {...pasta}/>
    //     <Recipe {...chili}/>
    // </div>


}