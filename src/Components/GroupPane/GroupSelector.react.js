import React, { Component } from 'react';

// import { GroupStore } from '../../Stores/GroupStore';
import { GroupActions } from '../../Actions/GroupActions';


// const getGroupState = () => ({
//   activeGroup: GroupStore.getActive(),
//   groups: GroupStore.getGroups()
// });

const _handleGroupClick = (group) => {
  
  console.log('setting active', JSON.stringify(group))
  GroupActions.setActive(group)
}


export const GroupSelector = ({
  groups,
  activeId
}) => (
  <div>
    {groups.map(group => <button 
      key={group.id}    
      onClick={e => {
        _handleGroupClick(group);
      }}
  >{group.id}</button>)}</div>
)
// }) => (
//   <div>
//     {console.log(groups)}
//     {groups.map(group => (
//       <button 
//         key={group.id}
//         onClick={
//           e => { _handleGroupChange(group) }
//         }
//       >{group.id}</button>
//     ))}
//   </div>
// );


// class GroupSwitch extends Component {

//   constructor(props, context) {
//     // super(props, context);

//     // this.state = getGroupState();
//   }

//   // _handleGroupChange() {
//     // console.log('handling group change');
//     // this.setState(getGroupState());
//   // }

//   // componentWillMount() {
//     // GroupActions.initGroups(this.props.memberOf);
//     // GroupStore.addListener(this._handleGroupChange.bind(this));
//   // }

//   render() {
//     return(
//       <div>
//         <div>Group Pane</div>
//         <div>Active: {JSON.stringify(this.state.activeGroup)}</div>
//         <div>Groups: {JSON.stringify(this.state.groups)}</div>
//       </div> 
//     );
//   }

// }


// export { GroupSelector };