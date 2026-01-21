import { Container, Row, Col, Form, Button } from "react-bootstrap";
import { useTranslation } from "react-i18next";
import "./CommunityPartnerships.css";
import communityAvatar from "../../assets/communitypart.jpg";

export default function CommunityPartnerships() {
  const { t } = useTranslation();

  return (
    <div className="community-page mt-2 pb-5 mb-5">
      <Container>
        <div className="community-card shadow-sm mb-5">

          {/* ===== Header ===== */}
          <header className="community-header text-center mt-3">
            <h4 className="community-title fw-bold mb-4 mt-5">
              {t("communityTitle")}{" "}
              <span className="text-muted">{t("communitySubTitle")}</span>
            </h4>

            <div className="community-avatar-wrapper mx-auto mb-4">
              <i className="fa fa-edit comm-icon"></i>
              <img
                src={communityAvatar}
                alt={t("communityImageAlt")}
                className="community-avatar"
              />
            </div>
          </header>

          {/* ===== Form ===== */}
          <Form className="community-form pb-4">
            <Row className="justify-content-center">
              <Col xs={12} md={8} lg={6}>

                {/* اسم الجهة */}
                <Form.Label className="mb-2">
                  {t("partnerName")}
                </Form.Label>
                <Form.Control
                  className="inputs mb-4"
                  placeholder={t("partnerNamePlaceholder")}
                />

                {/* اسم المندوب */}
                <Form.Label className="mb-2">
                  {t("representativeName")}
                </Form.Label>
                <Form.Control
                  className="inputs mb-4"
                  placeholder={t("representativeNamePlaceholder")}
                />

                {/* رقم الهاتف */}
                <Form.Label className="mb-2">
                  {t("phone")}
                </Form.Label>
                <Row className="g-2 mb-4">
                  <Col xs={8}>
                    <Form.Control
                      className="inputs"
                      placeholder={t("phonePlaceholder")}
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
                    <Form.Label className="mb-2">
                      {t("country")}
                    </Form.Label>
                    <Form.Control
                      className="inputs"
                      placeholder={t("countryPlaceholder")}
                    />
                  </Col>

                  <Col xs={12} md={6}>
                    <Form.Label className="mb-2">
                      {t("city")}
                    </Form.Label>
                    <Form.Control
                      className="inputs"
                      placeholder={t("cityPlaceholder")}
                    />
                  </Col>
                </Row>

                {/* العنوان */}
                <Form.Label className="mb-2">
                  {t("address")}
                </Form.Label>
                <Form.Control
                  className="inputs mb-4"
                  placeholder={t("addressPlaceholder")}
                />

                {/* زر الإرسال */}
                <Button className="setting-btn w-100" variant="primary">
                  {t("submitRequest")}
                </Button>

              </Col>
            </Row>
          </Form>
        </div>
      </Container>
    </div>
  );
}
