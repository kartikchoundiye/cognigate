import dns.resolver
from email_validator import validate_email, EmailNotValidError


def validate_email_address(email: str):

    # =====================================
    # CHECK EMAIL FORMAT AND DELIVERABILITY
    # =====================================

    try:
        valid = validate_email(email, check_deliverability=True)
        email = valid.email
        return True, email

    except EmailNotValidError as e:
        return False, str(e)
