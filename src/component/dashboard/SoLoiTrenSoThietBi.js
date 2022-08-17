import {Doughnut} from 'react-chartjs-2';
import {Box, Card, CardContent, CardHeader, colors, Divider, Typography, useTheme} from '@material-ui/core';
import PhoneIcon from '@material-ui/icons/Phone';
import TabletIcon from '@material-ui/icons/Tablet';

const SoLoiTrenSoThietBi = (props) => {
    const theme = useTheme();

    const data = {
        datasets: [
            {
                data: [85, 15],
                backgroundColor: [
                    '#3f51b5',
                    colors.red[600]

                ],
                borderWidth: 8,
                borderColor: colors.common.white,
                hoverBorderColor: colors.common.white
            }
        ],
        labels: ['Đang hoạt động', 'Thiết bị lỗi']
    };

    const options = {
        animation: false,
        cutoutPercentage: 80,
        layout: {padding: 0},
        legend: {
            display: false
        },
        maintainAspectRatio: false,
        responsive: true,
        tooltips: {
            backgroundColor: theme.palette.background.paper,
            bodyFontColor: theme.palette.text.secondary,
            borderColor: theme.palette.divider,
            borderWidth: 1,
            enabled: true,
            footerFontColor: theme.palette.text.secondary,
            intersect: false,
            mode: 'index',
            titleFontColor: theme.palette.text.primary
        }
    };

    const devices = [
        {
            title: 'Lỗi',
            value: 15,
            icon: TabletIcon,
            color: colors.red[600]
        },
        {
            title: 'Đang hoạt động',
            value: 85,
            icon: PhoneIcon,
            color: '#3f51b5'
        }
    ];

    return (
        <Card {...props}>
            <CardHeader title="SỐ LỖI / SỐ THIẾT BỊ"/>
            <Divider/>
            <CardContent>
                <Box
                    style={{
                        height: 300,
                        position: 'relative'
                    }}
                >
                    <Doughnut
                        data={data}
                        options={options}
                    />
                </Box>
                <Box
                    style={{
                        display: 'flex',
                        justifyContent: 'center',
                        pt: 2
                    }}
                >
                    {devices.map(({
                                      color,
                                      icon: Icon,
                                      title,
                                      value
                                  }) => (
                        <Box
                            key={title}
                            style={{
                                p: 1,
                                textAlign: 'center'
                            }}
                        >
                            <Icon color="action"/>
                            <Typography
                                color="textPrimary"
                                variant="body1"
                            >
                                {title}
                            </Typography>
                            <Typography
                                style={{color}}
                                variant="h2"
                            >
                                {value}
                                %
                            </Typography>
                        </Box>
                    ))}
                </Box>
            </CardContent>
        </Card>
    );
};

export default SoLoiTrenSoThietBi;
