import * as React from 'react';
import { ISpfxpagingProps } from './ISpfxpagingProps';
import Service from '../services/service';
import { ISpfxpagingState } from './IspfcpagingState';
import { Employee } from '../model/model';
import { Pagination } from '@pnp/spfx-controls-react/lib/pagination';
export default class Spfxpaging extends React.Component<ISpfxpagingProps,ISpfxpagingState> {
  service = new Service();
  constructor(props:ISpfxpagingProps){
    super(props)
    this.state={
      startIndex:0,
      itemsCount:0,
      pageItems:[],
      pageSize:5
    }
  }
  componentDidMount(): void {
    this.service.getItems(this.state.startIndex,this.state.pageSize).then((items)=>{
      this.service.getItemsCount().then((count:number)=>this.setState({
        pageItems:items,
        itemsCount:count
      }));
    });
  }
  getPage(page: number) {
    const roundupPage = page-1;
    this.service.getItems(roundupPage *this.state.pageSize,this.state.pageSize).then((items)=>
    this.setState({
      pageItems:items
    })
    );
}
  public render(): React.ReactElement<ISpfxpagingProps> {
    return (
      <div>
        {this.state.pageItems.map((item:Employee)=><div>{item.Title}</div>)}
        <Pagination
              currentPage={1}
              totalPages={Math.ceil(this.state.itemsCount /this.state.pageSize)}
              onChange={(page) => this.getPage(page)}
              limiter={1}
            />
      </div>
    );
  }
}
