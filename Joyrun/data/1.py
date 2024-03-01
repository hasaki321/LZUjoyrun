# 关注永雏塔菲喵，关注永雏塔菲谢谢喵
import math

li = []
datax = 35945678
datay = 104162997
for i in range(125):
    deltax = (35945678 - 35944378) * i / 125
    datax += deltax
    li.append([math.floor(datax), datay])


def cal_li(li_in, step):
    global li
    x_ori, y_ori, x_ter, y_ter = li_in[0][0], li_in[0][1], li_in[1][0], li_in[1][1]
    datax = x_ori
    datay = y_ori
    for i in range(step):
        deltax = (x_ori - x_ter) * i / step
        deltay = (y_ori - y_ter) * i / step
        datax += deltax
        datay += deltay
        li.append([math.floor(datax), math.floor(datay)])


cal_li([[35944378, 104162997],
        [35945678, 104163010]], 100)
cal_li([[35945678, 104163010],
        [35945704, 104163740]], 30)
cal_li([[35945704, 104163740],
        [35944673, 104163919]], 100)
cal_li([[35944673, 104163919],
        [35944378, 104162997]], 30)

print(li)
