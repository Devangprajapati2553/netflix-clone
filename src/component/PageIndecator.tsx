

const PageIndecator = ({pagesCount,currentPage,className} :{pagesCount:number, currentPage:number,className:string}) => {
  return (
    isFinite(pagesCount)?
    <div>
        <ul className={`flex  gap-1  justify-end items-center pr-4  ${className} `}>
    {Array(pagesCount).fill(0).map((index)=>(
        <li className={`h-[2px] w-3 ${currentPage===index ? "bg-gray-100" : "bg-gray-600"} `} key={index}></li>
    ))} 
      </ul>
    </div>
    :
    null
  )
}

export default PageIndecator
