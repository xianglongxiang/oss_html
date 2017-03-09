/**
 * Created by xlx on 2015/12/31.
 *  ��ȡ��һ����/��һ����
 * @date ��ʽΪyyyy-mm-dd�����ڣ��磺2014-01-25
 * @ʹ�÷��� �磺 SJDate.getPreMonth("2012-02-2")
 *
 */
(function(w){
    var SJDate = {
        getPreMonth:function(date){
            var d = new Date(date);
            var year = d.getFullYear(); //��ȡ��ǰ���ڵ����
            var month = d.getMonth()+1;//��ȡ��ǰ���ڵ��·�
            var day = d.getDate();//��ȡ��ǰ���ڵ���
            var year2 = year;
            var month2 = parseInt(month) - 1;
            if (month2 == 0) {
                year2 = parseInt(year2) - 1;
                month2 = 12;
            }
            var day2 = day;
            var days2 = new Date(year2, month2, 0);//��ȡ��һ�µ�����
            days2 = days2.getDate();
            if (day2 > days2) {
                day2 = days2;
            }
            if (month2 < 10) {
                month2 = '0' + month2;
            }
            var t2 = year2 + '-' + month2 + '-' + day2;
            return t2;
        },
        getNextMonth:function(date){
            var d = new Date(date);
            var year = d.getFullYear(); //��ȡ��ǰ���ڵ����
            var month = d.getMonth()+1;//��ȡ��ǰ���ڵ��·�
            var day = d.getDate();//��ȡ��ǰ���ڵ���
            var year2 = year;
            var month2 = parseInt(month) + 1;
            if (month2 == 13) {
                year2 = parseInt(year2) + 1;
                month2 = 1;
            }
            var day2 = day;
            var days2 = new Date(year2, month2, 0);
            days2 = days2.getDate();
            if (day2 > days2) {
                day2 = days2;
            }
            if (month2 < 10) {
                month2 = '0' + month2;
            }

            var t2 = year2 + '-' + month2 + '-' + day2;
            return t2;
        }
    };
    w.SJDate = SJDate;
})(window)