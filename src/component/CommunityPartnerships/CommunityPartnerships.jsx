import { Container, Row, Col, Form, Button } from "react-bootstrap";
import "./CommunityPartnerships.css";
import communityAvatar from "../../assets/communitypart.jpg";

export default function CommunityPartnerships() {
  return (
    <div className="community-page mt-2 pb-5 mb-5">
      <Container>
        <div className="community-card shadow-sm mb-5">

          {/* ===== Header ===== */}
          <header className="community-header text-center mt-3">
            <h4 className="community-title fw-bold mb-4 mt-5">
              إضافة شراكة مجتمعية / <span className="text-muted">الشركات</span>
            </h4>

            <div className="community-avatar-wrapper mx-auto mb-4">
              <i className="fa fa-edit comm-icon"></i>
              <img
                src={communityAvatar}
                alt="صورة الجهة"
                className="community-avatar"
              />
            </div>
          </header>

          {/* ===== Form ===== */}
          <Form className="community-form pb-4">
            <Row className="justify-content-center">
              <Col xs={12} md={8} lg={6}>

                {/* اسم الجهة */}
                <Form.Label className="mb-2">اسم الجهة المشاركة</Form.Label>
                <Form.Control
                  className="inputs mb-4"
                  placeholder="جهة مجتمعية"
                />

                {/* اسم المندوب */}
                <Form.Label className="mb-2">اسم المندوب</Form.Label>
                <Form.Control
                  className="inputs mb-4"
                  placeholder="اسم المندوب"
                />

                {/* رقم الهاتف */}
                <Form.Label className="mb-2">رقم الهاتف</Form.Label>
                <Row className="g-2 mb-4">
                  <Col xs={8}>
                    <Form.Control
                      className="inputs"
                      placeholder="789 456 123"
                    />
                  </Col>
                  <Col xs={4}>
                    <Form.Select className="inputs keyphone-ar">
                      <option>+966</option>
                      <option>+20</option>
                    </Form.Select>
                  </Col>
                </Row>

                {/* الدولة + المدينة */}
                <Row className="g-3 mb-4">
                  <Col xs={12} md={6}>
                    <Form.Label className="mb-2">الدولة</Form.Label>
                    <Form.Control
                      className="inputs"
                      placeholder="الدولة"
                    />
                  </Col>

                  <Col xs={12} md={6}>
                    <Form.Label className="mb-2">المدينة / المحافظة</Form.Label>
                    <Form.Control
                      className="inputs"
                      placeholder="المدينة / المحافظة"
                    />
                  </Col>
                </Row>

                {/* العنوان */}
                <Form.Label className="mb-2">العنوان</Form.Label>
                <Form.Control
                  className="inputs mb-4"
                  placeholder="العنوان"
                />

                {/* زر الإرسال */}
                <Button className="setting-btn w-100" variant="primary">
                  إرسال الطلب
                </Button>

              </Col>
            </Row>
          </Form>
        </div>
      </Container>
    </div>
  );
}
