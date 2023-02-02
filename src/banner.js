import React from 'react';

// css
import './styles.css';
// import '../../../globalStyles/styles.css';

// components
import { List, Typography, Button, Row, Col } from 'antd';
import LinkButton from '@ivoyant/component-link-button';
import shortid from 'shortid';

export default function ComponentBanner({
    properties,
    component,
    data = [],
    store = {},
    responseData = [],
    loading = undefined,
    error = undefined,
    payload = undefined,
    templateClassName,
    workflow = [],
    ...props
}) {
    const { Title, Text } = Typography;
    let recommendations = data?.data?.recommendations?.recommendations || [];
    const sortedRecommendations = recommendations?.sort((a, b) =>
        a.priority > b.priority ? 1 : -1
    );
    const finalData = sortedRecommendations.slice(0, 3);

    // destructuring props
    const { header, actions } = properties;

    const listHeader = (topHeader) => (
        <Title level={5} className="list-header" style={{ padding: '0% 5%' }}>
            {topHeader}
        </Title>
    );

    const listItemHeader = (itemHeader) => (
        <Text className="list-item-header">{itemHeader ? itemHeader : ''}</Text>
    );

    const getAction = (type) => {
        let value = actions?.find(({ feature }) => feature === type);
        return value || {};
    };

    return (
        <div className="list-container">
            <List
                header={listHeader(header)}
                itemLayout="vertical"
                size="small"
                dataSource={finalData}
                split={false}
                renderItem={(item) =>
                    getAction(item?.featureName).type === 'memo' ? (
                        <span>
                            <List.Item
                                key={item?.message}
                                style={{ padding: '0 0 8px 16px' }}
                            >
                                <List.Item.Meta
                                    title={listItemHeader(
                                        item?.message
                                            ? item?.message
                                            : item?.actionName
                                    )}
                                />
                                <Row className="list-item-content">
                                    <Col span={24}>{item?.notes}</Col>
                                </Row>
                            </List.Item>
                            <hr className="list-split" />
                        </span>
                    ) : (
                        <span>
                            <List.Item
                                key={item?.actionName}
                                style={{ padding: '0 0 8px 16px' }}
                            >
                                <List.Item.Meta
                                    title={listItemHeader(item?.actionName)}
                                />
                                {item?.attributes?.map(({ name, value }) => (
                                    <Row className="list-item-content" key={shortid.generate()}>
                                        <Col span={9}>{name}</Col>
                                        <Col span={1}>:</Col>
                                        <Col span={14}>{value}</Col>
                                    </Row>
                                ))}
                                {item?.messageCode == 'showNotes' && (
                                    <Row className="list-item-content">
                                        <Col span={24}>{item?.notes}</Col>
                                    </Row>
                                )}
                                <Row className="list-item-action-button">
                                    <Col>
                                        <LinkButton
                                            size="small"
                                            type="primary"
                                            href={
                                                getAction(item?.featureName)
                                                    ?.route
                                            }
                                            routeData={
                                                getAction(item?.featureName)
                                                    ?.routeData
                                            }
                                        >
                                            Take Action
                                        </LinkButton>
                                    </Col>
                                </Row>
                            </List.Item>
                            <hr className="list-split" />
                        </span>
                    )
                }
            />
        </div>
    );
}
