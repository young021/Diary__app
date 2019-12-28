import React from 'react';
import { StyleSheet, Text, View,ScrollView,FlatList,TouchableOpacity ,AsyncStorage} from 'react-native';
import { SafeAreaView } from 'react-navigation';
import { MaterialCommunityIcons } from '@expo/vector-icons'
import { Calendar } from 'react-native-calendars';




export default class MainScreen extends React.Component {
    static navigationOptions = {
        tabBarIcon: ({ tintColor }) => (
            <MaterialCommunityIcons name="calendar-multiselect" size={30} style={{ color: tintColor }}/>
      ) 
    }
    constructor(props){
      super(props)
      this.state = {
          selectedDate: '',

          Posts: [{
              title: '8월 30일에 쓴 글',
              content: '본문',
              id: 1,
              date: '2019-08-30',
          },
          {
              title: '8월 29일에 쓴 글',
              content: '본문',
              id: 2,
              date: '2019-08-29',
          },

          ]
      }
  }
_storeData = async () => {
    try {
        await AsyncStorage.setItem('@diary:state', JSON.stringify(this.state));
    } catch (e) {
    }
}
_getData = async () => {
    try {
        const mystate = await AsyncStorage.getItem('@diary:state');
        if (mystate !== null) {
            this.setState(JSON.parse(mystate));
        }
    } catch (e) {
    }
};

  componentDidMount(){    //React의 life cycle에서 Mount 된 이후에 실행하라는 의미입니다.
    this._getData()
    this.props.navigation.addListener(  //addListener를 통해 Event를 추가해줍니다
        'didFocus',                     //이 screen(현재 Main)이 focus되면
        payload => {                    //payload란 data중에서도 관심이 잇는 부분을 말한다
																				//payload 대신 ()라고 작성해 주셔도 됩니다 익명함수로
						newpost = this.props.navigation.getParam('myparam') 
						signal = this.props.navigation.getParam('signal')
            if (newpost ) {   //넘어온 newpost가 있으면 if문이 true가 되고 실행됩니다
                const PrevPosts = [...this.state.Posts]  //todo App에서 했던것처럼 ...(spread operator)를 이용해줍니다
                this.setState({ Posts: PrevPosts.concat(newpost) }, this._storeData ) 
//이전 일기와 새로운 일기를 concat으로 연결!
                this.props.navigation.navigate('MainScreen',{myparam: false })
                
              }     //일기가 추가되고 나면 다시금 MainScreen으로 myparam이란 이름의 false 값을 넘겨줍시다
              else if(signal){
                const PrevPosts2 = [...this.state.Posts]  //이전 일기들을 풀어서 list로 해준다.
 
								//array에서 item의 id랑 signal로 넘어온 post.id값이랑 같은 값의 Index를 저장
                deleteIndex = PrevPosts2.findIndex((item) => { return item.id == signal });
                PrevPosts2.splice(deleteIndex, 1);  //해당 index부터 1개만큼만 삭제
                
                this.setState({ Posts: PrevPosts2 }, this._storeData)
                this.props.navigation.navigate('MainScreen', { signal: false })
                
            } 
          }
      );
        }
   
 
  
    render(){
        return (
            console.log(this.state.selectedDate),
            <SafeAreaView style={styles.container}>
                <Calendar
                    onDayPress={(day) => { this.setState(this.state.selectedDate = day)} }
                    current={new Date()}/>
                <ScrollView>
                    <FlatList
                      data ={this.state.Posts.filter(data => { return data.date == this.state.selectedDate.dateString })}
                      renderItem ={({item, index})=>{
                          return (
                              <TouchableOpacity
                              onPress={() => {this.props.navigation.navigate('Detail',{post:item})}}>
                                  <View>
                                      <Text style = {styles.listtext}>
                                          제목 : {item.title}
                                      </Text>
                                      <Text style={styles.listtext}>
                                          내용 : {item.content}
                                      </Text>
                                  </View>
                              </TouchableOpacity>
                          )
                      }}
                      keyExtractor = {(item, index) => {return `$(index)`}}  />
                </ScrollView>
            </SafeAreaView>
        );
    }
    
}
const styles = StyleSheet.create({
  container: {
      flex: 1,
      paddingTop:50,
      //여기서 가운데 정렬 속성을 없애줘야지 우리의 Calendar가 이쁘게 위에서 부터 뜨게 됩니다!
      //아니면 여러분의 취향에 맞게끔 위치를 옮겨주셔도 좋아요!
  },

    listitem:{
        marginLeft:50,
        marginTop:20,
        borderLeftColor: "black",
        borderLeftWidth: 4,
        paddingLeft:30,
    },

    container: {
        flex: 1,
        paddingTop:50,
    },
    textstyle:{
        fontSize:40,
    },
    listtext:{
        fontSize : 20,
    }
});


