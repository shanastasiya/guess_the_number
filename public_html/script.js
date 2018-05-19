var attempt_count=0;
var secret_number=0;
var records= Array();//записи в Истории
var history_tab= document.querySelector('.history').firstChild ;

var tab= document.createElement('div'); //блок отображает количество попыток в кружочке
tab.className= "circle";
document.querySelector('.attempt_show').appendChild(tab);
tab.style.display = 'none';

document.querySelector('.one_button').onclick=function()
{
    elementt = document.querySelector('.right');
    if(check_for_number(elementt))
    {
        document.querySelector('.number_enter').style.display = 'block';
        document.querySelector('.enter_button').style.display = 'block';
        document.querySelector('.one_button').style.display = 'none';
        document.querySelector('.resert_button').style.display = 'block';
    }
    else return;

    right = document.querySelector('.right').value;
    var temp = right;
    attemt_count =0;
    //расчет количества попыток
    while(temp!==1)
    {
        temp=Math.round(temp/2);
        attempt_count++;
    }
    tab. textContent =attempt_count;
    tab.style.display = 'block';
    secret_mumber_generator();
};

function secret_mumber_generator()
{
    secret_number = Math.round(Math.random() * right)+1;
};

document.querySelector('.enter_button').onclick=function()
{
    number = document.querySelector('.number_enter').value;
    element = document.querySelector('.number_enter');
    if(!check_for_number(element))
        return;
    attempt_count--;
    tab.textContent =attempt_count;
    if(Number(number)===secret_number)
    {
        win();
        return;
    }
    else
    {
        if(attempt_count<=0)
        {
            lose();
            return;
        }
        //добавляем запись record в историю
        record= document.createElement('p');
        if(number>secret_number)  record.textContent =number+ ' > x';
        else  record.textContent =number + " < x";//вывод

        document.querySelector('.history_records').appendChild(record);
    }
};
function check_for_number(element)
{
    temp = element.value;
    if(isNaN(temp) || temp-Math.round(temp)!==0 || temp<1)
    {
        element.style.backgroundColor='#f1a1a1';
        return false;
    }
    else
    {
        element.style.backgroundColor='#FFF';
        return true;
    }
}
//сброс
document.querySelector('.resert_button').onclick=function()
{
    resert();
};
function resert()
{
    result_reset();
    tab.style.display = 'none';

    while(document.querySelector('.history_records').firstChild)
        document.querySelector('.history_records').removeChild(document.querySelector('.history_records').firstChild);
    attempt_count=0;
    secret_number=0;
    right=null;
};
function result_reset()
{
    document.querySelector('.one_button').style.display = 'block';
    document.querySelector('.number_enter').value = '';
    document.querySelector('.right').value = '';
    document.querySelector('.number_enter').style.display = 'none';
    document.querySelector('.enter_button').style.display = 'none';
    document.querySelector('.resert_button').style.display = 'none';      
}
function lose()
{
    result_reset();
    document.querySelector('.myu2').style.zIndex = 5;
    document.querySelector('.result').textContent = 'Вы проиграли! Правильный ответ: ' + secret_number;
};
function win()
{
    result_reset();
    document.querySelector('.myu2').style.zIndex = 5;
    document.querySelector('.result').textContent = 'Вы выиграли!';
};
document.querySelector('.myu2').onclick=function()
{
    resert();
    document.querySelector('.myu2').style.zIndex = -5;
};
