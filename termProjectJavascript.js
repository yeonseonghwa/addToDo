var Mon = new Array();
var Tue = new Array();
var Wed = new Array();
var Thu = new Array();
var Fri = new Array();
var AllWeekend =[Mon,Tue,Wed,Thu,Fri];
var weekendId = ['displayArea_mon','displayArea_tue','displayArea_wed','displayArea_thu','displayArea_fri'];
var weekendString = ['Mon','Tue','Wed','Thu','Fri'];
var DivPositionOfIndex;
var DivPositionOfWeekend;

//배경색을 투명 그레이드 색으로 만들어준다.
function AddToDoShowdiv() {
  document.getElementById('ItemAl').value='';
  document.getElementById('ContentsAl').value='';
  document.getElementById('bg').style.display ='block';
  document.getElementById('AddToDoShow').style.display ='block';
}
//배경색을 없애고 원래 화면을 보여준다.
function AddToDoHidediv() {
  document.getElementById('bg').style.display ='none';
  document.getElementById('AddToDoShow').style.display ='none';
}

//팝업창에 있는 add 버튼을 클릭시 일어나는 이벤트
function AddClick(){
  var weekend = document.getElementById('AddToDoDaySelect').value; //요일
  var item = document.getElementById('ItemAl').value;             //아이템 내용
  var content = document.getElementById('ContentsAl').value;      //contents 내용
  var div = document.createElement('div');                        //div태그를 하나 만들어준다.
  div.setAttribute('onclick','ToDoItemConfirm(this)');            //만들어진 태그를 클릭했을때 상세정보를 보여주는 이벤트 추가
  div.setAttribute('class','item');
  var p1 = document.createElement('p');
  var p2 = document.createElement('p');
  p1.appendChild(document.createTextNode(item));  //아이텐을 저장하는 p테그
  p2.appendChild(document.createTextNode(content)); //contents를 저장하는 p태그
  var imgTag = document.createElement('img');       //삭제할때 필요하는 x 버튼
  imgTag.setAttribute('class','ToDoItemRemove');    //
  imgTag.setAttribute('src','delete.png');
  imgTag.setAttribute('onclick','stopPropagation(this.parentElement)'); //x버튼을 클릭했을때 해당 일을 삭제하는 이벤트
  div.appendChild(imgTag);      //div에게 x버튼이미지 item contents를 추가해준다.
  div.appendChild(p1);
  div.appendChild(p2);
  pushDivToArray(weekend,div);  //해당 div를 배열에 저장한다.
  p1.style.marginTop='28px';
  printDivToWebDisplay(AllWeekend); //모든 div를 화면에 출력한다.
  document.getElementById('bg').style.display ='none';
  document.getElementById('AddToDoShow').style.display ='none';
}
function stopPropagation(parameter){
  var classname=parameter.class;
  if(classname!='ToDoItemRemove'){
    ToDoItemRemove(parameter);
    event.stopPropagation();
  }else
    return;
}
//아이템을 삭제하는 클래스,  x를 클릭했을시 자신의 부모태그를 parameter로 들어온다.
function ToDoItemRemove(parameter){ //class item
  var index;
  var weekend = parameter.parentElement.className; //x를 클릭시 x의 부모클래스인 부모클래스 div태그의 클래스 이름을 찾는다.
  var item = parameter.childNodes[1].innerHTML;  //item 선택
  for(var i=0; i < AllWeekend.length; i++){
    if(weekend==weekendId[i]){        //클릭하는 x의 무슨요일인지 판다나한다.
      index=valueContain(AllWeekend[i],item);   //해당 item의 index 를 추출한다.
      AllWeekend[i].splice(index,1);            //해당 item를 삭제한다.   (index위치에 있는 한개의 요소 삭제)
    }
  }
  printDivToWebDisplay(AllWeekend); //삭제가 끝나면 다시 모든 것을 화면에 출력한다.
}
// 사용자가 지정하는 요일에 따라 그에 맞는 배열에 저장한다.(div전체)
function pushDivToArray(weekend,div){
  if(weekend=='mon')
    Mon.push(div);
  else if(weekend=='tue')
    Tue.push(div);
  else if(weekend=='wed')
    Wed.push(div);
  else if(weekend=='thu')
    Thu.push(div);
  else if(weekend=='fri')
    Fri.push(div);
}
//item의 index를 추출한다.
function valueContain(mon,item){
  for(var i = 0; i < mon.length; i++){
    if(item==mon[i].childNodes[1].innerHTML)
      return i;
  }
}

//모든 일을 화면에 출력하는 함수
function printDivToWebDisplay(Weekend){
  var div;
  // 화면에 있는 내용을 모두 삭제한다.
  for(var i = 0; i < Weekend.length; i++){ //월요일 부터 금요일
    div=document.getElementsByClassName(weekendId[i])[0].getElementsByTagName('div');
    for(var j = div.length-1; j >= 0; j--) //해당 요일에 있는 모든 내용을 삭제한다.
      div[j].remove();//여기까지했다  삭제할때는 뭔가 이상하다 첫번째거랑 마지막은 되는데 중간거는 안 된다.
  }

  //배열에 저장된 모든 div를 화면에 출력한다.
  for(var i = 0; i < Weekend.length; i++){
      for(var j = 0; j<Weekend[i].length; j++){
        var node = document.getElementsByClassName(weekendId[i])[0]; //요일 목록을 찾는다
        node.appendChild(Weekend[i][j]);  //요일 밑에 div를 추가한다.
      }
  }
}

//item을 클릭했을때 상세정보를 보여주는 함수
function ToDoItemConfirm(parameter){  //parameter는 클릭하는 div
  var item = parameter.childNodes[1].innerHTML;  //item정보를 가져온다.
  document.getElementById('confirmItemAl').value='';
  document.getElementById('confirmContentsAl').value='';
  document.getElementById('bg').style.display ='block';
  document.getElementById('itemConfirmShow').style.display ='block';
  var weekend = parameter.parentElement.className;   //무슨 요일인지 확인
  for(var i = 0; i < weekendId.length; i++){
    if(weekend==weekendId[i]){
      DivPositionOfWeekend=weekendString[i];   //클릭하는 item이 소속하는 요일

      //배열에서 정보를 가져와서 팝업창에 출력해준다.
      document.getElementById('itemConfirmDaySelect').value = weekendString[i];  //요일
      DivPositionOfIndex = valueContain(AllWeekend[i],item);    //해당 item의 index위치
      document.getElementById('confirmItemIndex').value = DivPositionOfIndex + 1; //실제위치 (index+1이 실제위치)
      document.getElementById('confirmItemAl').value = AllWeekend[i][DivPositionOfIndex].childNodes[1].innerHTML; //item정보
      document.getElementById('confirmContentsAl').value = AllWeekend[i][DivPositionOfIndex].childNodes[2].innerHTML; //contents정보
    }
  }
}
function itemConfirmHidediv() {
    document.getElementById('bg').style.display ='none';
    document.getElementById('itemConfirmShow').style.display ='none';
}

//Done을 클릭했을시 실행되는 함수
function DoneClick(){
  var weekend=document.getElementById('itemConfirmDaySelect').value;
  var index=document.getElementById('confirmItemIndex').value;
  var item=document.getElementById('confirmItemAl').value;
  var content=document.getElementById('confirmContentsAl').value;
  AllWeekend[weekendString.indexOf(DivPositionOfWeekend)].splice(DivPositionOfIndex,1); //원래위치에 있는 item 삭제
  var newDiv=makeDiv(item,content);
  AllWeekend[weekendString.indexOf(weekend)].splice(index-1,0,newDiv);  //새로입력한 정보를 원하는 위치에 추가한다.0은 삭제 안한다는 뜻
  itemConfirmHidediv();
  printDivToWebDisplay(AllWeekend);
}

function makeDiv(item,content){
  var div = document.createElement('div');
  div.setAttribute('onclick','ToDoItemConfirm(this)');
  div.setAttribute('class','item');
  var p1 = document.createElement('p');
  var p2 = document.createElement('p');
  p1.appendChild(document.createTextNode(item));
  p2.appendChild(document.createTextNode(content));
  var imgTag = document.createElement('img');
  imgTag.setAttribute('class','ToDoItemRemove');
  imgTag.setAttribute('src','delete.png');
  imgTag.setAttribute('onclick','stopPropagation(this.parentElement)');
  div.appendChild(imgTag);
  div.appendChild(p1);
  div.appendChild(p2);
  p1.style.marginTop='28px';
  return div;
}
//검색기능
function search(parameter){
  if(event.keyCode==13){   //enter키
    var index;
    var localMon = new Array();
    var localTue = new Array();
    var localWed = new Array();
    var localThu = new Array();
    var localFri = new Array();
    var localAllWeekend =[localMon,localTue,localWed,localThu,localFri];
    var weekend = parameter.previousSibling.previousSibling.value;  //previousSibling 이전형제노드 select에 선택되어 있는 요일를 의미, 두개 쓰는 이유는 당시에 한개쓸시에 효과가 없었다. 왜인지는 불명
    var searchValue = parameter.value;
    if(weekend=='day'){
      for(var i = 0; i < AllWeekend.length; i++)   //요일별
        for(var j = 0; j < AllWeekend[i].length; j++)  //index별
          if(AllWeekend[i][j].childNodes[1].innerHTML.includes(searchValue))  //index별 위치에 검색하는 값이 포함되어 있는지
            localAllWeekend[i].push(AllWeekend[i][j]);
      printDivToWebDisplay(localAllWeekend);
    }else{
      index = weekendString.indexOf(weekend);
      for(var i = 0; i < AllWeekend[index].length; i++)
        if(AllWeekend[index][i].childNodes[1].innerHTML.includes(searchValue))
          localAllWeekend[index].push(AllWeekend[index][i]);
      printDivToWebDisplay(localAllWeekend);
    }
  }
}
